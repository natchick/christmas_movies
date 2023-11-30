const express = require('express');
const app = express();
const port = 8081 ;
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')["development"])

app.use(express.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend origin
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use(cors()); 


// let christmasMovies = [
//     {
//         "id": 1,
//         "title": "Polar Express",
//         "year": 2004,
//     },
//     {
//         "id": 2,
//         "title": "Elf",
//         "year": 2003, 
//     },
//     {
//         "id": 3,
//         "title": "Home Alone",
//         "year": 1990,
//     },
//     {
//         "id": 4,
//         "title": "It's a Wonderful Life",
//         "year": 1946,
//     }
// ];


app.listen(port, () => {
    console.log(`Your applciation is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.send(`Your application is running`)
})

app.get('/movies', (req, res) => {
    knex('movies_table')
        .select('*')
        .then(movies => {
            res.json(movies);
        })
})

