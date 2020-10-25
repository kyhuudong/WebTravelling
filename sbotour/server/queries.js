const Pool = require('pg').Pool;
const md5 = require('md5');
require('dotenv').config({ path: 'database.env' });

const pool = new Pool({
    user : process.env.USER,
    host : process.env.HOST,
    database : process.env.DATABASE,
    password : process.env.PASSWORD,
    port : process.env.PORT,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error,results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserByUsername = (request, response) => {
    const id = request.params.customerid;
    id = md5(id);
    pool.query('SELECT * FROM users WHERE username = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createCustomer = (req, res) => {
    const {id, password,fullname,email} = req.body;
    try{
        pool.query('INSERT INTO users (username, password,full_name,email, role_id) VALUES( $1, $2, $3, $4 , $5);',
                [md5(id), md5(password), fullname, email, '2'],
                (error, results, nothing) => {
                    if(error){
                        console.log("Error : ",error);
                        res.status(201).send(`Error: ${error}`);
                        //throw error;
                    } else if(results){
                        console.log("Successfully");
                        res.status(201).send(`Successfully!!!`);
                    }
                    else{
                        console.log("Do nong thing : ",nothing)
                        res.status(201).send(`Do nothing: ${nothing}`);
                    }

                    
                })
    }
    catch (err) {
        res.status(201).send(`Err: ${err}`);
        console.log("Error : ",err);
    }

}


const createGoogleUser = (req, res) => {
    const {name, email, token, userimage} = req.body;

    try{
        pool.query('INSERT INTO users (username, password,full_name,email, role_id) VALUES($1,$2,$3,$4,$5);',
            [token, token, name, email,'2'],
            (error,result) => {
                if(error){
                    console.log("Error : ",error);
                    res.status(201).send(error);
                }
                else if(result){
                    pool.query('SELECT user_id FROM users WHERE username = $1;',
                    [token],
                    (error,result) => {
                        if(error){
                            console.log("Error : ",error);
                            res.status(201).send(error);
                        }
                        else if(result){
                            console.log("Successfully");
                            res.status(201).send(result.rows[0]);
                        }
                    })
                }
            })
    }
    catch(error){
        res.status(201).send(`Error : ${error}`);
        console.log("Error : ", error);
    }
}

const checkLogin = (req, res) => {
    const {id, password} = req.body;
    try{
        pool.query('SELECT * FROM users WHERE username = $1 AND password = $2',[md5(id), md5(password)],

                    (error, result) => {
                        console.log(result);
                        if(error){
                            console.log("Error : ",error);
                            res.status(201).send(`Error : ${error}`)
                        }
                        else if(result.rowCount === 0){
                            console.log("Failed");
                            res.status(201).send(null);
                        }
                        else{
                            console.log("Success");
                            console.log(result)
                            res.status(201).send(result.rows[0]);
                        }

                    })
    }
    catch(error){
        res.status(201).send(`Error : ${error}`);
        console.log(error);
    }
}



module.exports = {
    getUsers,
    getUserByUsername,
    createCustomer,
    createGoogleUser,
    checkLogin
}