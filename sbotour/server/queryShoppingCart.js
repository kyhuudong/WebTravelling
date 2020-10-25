const Pool = require('pg').Pool;
require('dotenv').config({ path: 'variables.env' });

const pool = new Pool({
    user : process.env.USER,
    host : process.env.HOST,
    database : process.env.DATABASE,
    password : process.env.PASSWORD,
    port : process.env.PORT,
})

const getShoppingCartByUserID = (request, response) => {
    const user_id = request.body.user_id;
    const status = 'booked';
    console.log(user_id);
    pool.query('SELECT bt.booked_tour_id, t.tour_id, tour_name, t.departure_location, amount, t.tour_cost FROM users u, tour t, booked_tour bt WHERE u.user_id = bt.user_id and t.tour_id = bt.tour_id and bt.user_id = $1 and bt.status = $2;'
    ,[user_id, status], (error,results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows);
    })
}

const getTourPaidByUserID = (request, response) => {
    const user_id = request.body.user_id;
    const status = 'paid';
    console.log(user_id);
    pool.query('SELECT bt.booked_tour_id, t.tour_id, tour_name, t.departure_location, amount, t.tour_cost FROM users u, tour t, booked_tour bt WHERE u.user_id = bt.user_id and t.tour_id = bt.tour_id and bt.user_id = $1 and bt.status = $2;'
    ,[user_id, status], (error,results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows);
    })
}

const addToShoppingCart = (request, response) => {
    const {tour_id, user_id, amount, status} = request.body;
    pool.query('INSERT INTO booked_tour(tour_id, user_id, amount, status) VALUES ($1, $2, $3, $4);', [tour_id, user_id, amount, status], (error,results) => {
        if(error){
            response.status(200).json(err);
        } else {
            const result = 'success';
            response.status(200).json(result);
        }
    })
}

const updateShoppingCart = (request, response) => {
    const {booked_tour_id, amount, status} = request.body;
    console.log(booked_tour_id, amount, status);
    pool.query('UPDATE booked_tour SET amount = $1, status = $2 WHERE booked_tour_id = $3;', [amount, status, booked_tour_id], (error,results) => {
        if(error){
            response.status(200).json(err);
        } else {
            const result = 'success';
            response.status(200).json(result);
        }
    })
}

const removeToShoppingCart = (request, response) => {
    const id = request.body.tour_id;
    pool.query('DELETE FROM booked_tour WHERE booked_tour_id = $1;', [id], (error,results) => {
        if(error){
            response.status(200).json(err);
        }
        response.status(200).json('success');
    })
}

module.exports = {
    getShoppingCartByUserID,
    addToShoppingCart,
    removeToShoppingCart,
    updateShoppingCart,
    getTourPaidByUserID
}