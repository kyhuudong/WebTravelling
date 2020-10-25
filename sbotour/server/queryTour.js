const Pool = require('pg').Pool;
require('dotenv').config({ path: 'variables.env' });

const pool = new Pool({
    user : process.env.USER,
    host : process.env.HOST,
    database : process.env.DATABASE,
    password : process.env.PASSWORD,
    port : process.env.PORT,
})

const getTours = (request, response) => {
    pool.query('SELECT t.tour_id, t.description, tour_name, MIN(time_start), MAX(time_finish),departure_location, t.tour_cost, t.image FROM tourist_attractions ta, tour t, tour_detail td WHERE t.tour_id = td.tour_id and td.tourist_attraction_id = ta.tourist_attraction_id GROUP BY t.tour_id;', (error,results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTourByID = (request, response) => {
    const {id} = request.body;
    pool.query('SELECT t.tour_id, tour_name, ta.tourist_attraction_name, ta.description, time_start, time_finish, t.tour_cost, t.departure_location, t.vehicle FROM tourist_attractions ta, tour t, tour_detail td WHERE t.tour_id = td.tour_id and td.tourist_attraction_id = ta.tourist_attraction_id and t.tour_id = $1;', [id], (error,results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getTours,
    getTourByID
}