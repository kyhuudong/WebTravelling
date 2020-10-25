const Pool = require('pg').Pool;
require('dotenv').config({ path: 'variables.env' });

const pool = new Pool({
    user : process.env.USER,
    host : process.env.HOST,
    database : process.env.DATABASE,
    password : process.env.PASSWORD,
    port : process.env.PORT,
})

const getTouristAttractions = (request, response) => {
    pool.query('SELECT * FROM tourist_attractions', (error,results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getTouristAttractions
}