const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

const db = require('./queries')
const ta = require('./queryTouristAttraction')
const t = require('./queryTour')
const sc = require('./queryShoppingCart');
const td =require('./queryTouristDetail')
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({ 
        extended: true, 
    })
)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (request, response) => {
    response.json({info:'Node.js, Express, and Postgres API'})
    
})


app.get('/users', db.getUsers)
app.get('/users/:customerid', db.getUserByUsername)
app.post('/users',db.createCustomer)
app.post('/googleusers', db.createGoogleUser)
app.get('/touristAttractions', ta.getTouristAttractions)
app.post('/checkLogin', db.checkLogin)
app.get('/tours', t.getTours)
app.post('/shoppingCart', sc.getShoppingCartByUserID)
app.post('/addToshoppingCart', sc.addToShoppingCart)
app.post('/removeTourInCart', sc.removeToShoppingCart)
app.post('/TouristDetail',td.getTouristDetail)
app.post('/payTour', sc.updateShoppingCart)
app.post('/getTourPaid', sc.getTourPaidByUserID)


app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});


// const login = require('./login');

// app.use(express.json());
// app.use(function (req, res, next){
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DETELE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//     next();
// });

// app.get('/', (req, res) => {
//     login.getCustomer()
//     .then(response => {
//         res.status(200).send(response);
//     })
    
//     .catch(error => {
//         res.status(500).send(error);
//     })
// });


