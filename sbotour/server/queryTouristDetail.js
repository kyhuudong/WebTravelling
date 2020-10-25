const Pool = require('pg').Pool;
require('dotenv').config({ path: 'database.env' });

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
})
const getTouristDetail = (req, res) => {

    const { tour_id } = req.body;

    pool.query('SELECT ta.tourist_attraction_name, ta.description FROM tourist_attractions ta, tour t, tour_detail td WHERE t.tour_id = td.tour_id and td.tourist_attraction_id = ta.tourist_attraction_id and t.tour_id=$1 ORDER BY(td.time_start) ASC',
        [tour_id],
        (error, results) => {
            console.log("day la tour id ", tour_id);
            if (error) {
                console.log('error : ', error);
                res.json(201).send(`Error : ${error}`);
            }
            else if (results === null) {
                console.log('null');
            }
            else {
                console.log(results);
                res.status(201).json(results.rows);
            }

        })
}
module.exports = {
    getTouristDetail
}
