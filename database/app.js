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



app.post('/movies', (req, res) => {
    let movieID = req.body;

    knex('movies_table')
    .insert({
        "id": 10,
        "title": "The Santa Clause",
        "year": 1994,
    })
    .into('movies_table')
    .then(() => res.json({ message: 'Movie added successfully'}))
} );

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

app.get('/movies/:id', (req, res) => {
    var {id} = req.params;
    knex('movies_table')
    .select('*')
    .where('id', id)
    .then(data => {
        res.json(data);
    } )

})

app.delete('/movies/:id', (req, res) => {
    let movieID = req.params.id;

    knex('movies_table')
    .where('id', movieID)
    .del()
    .then(() => res.json({ message: 'Movie deleted successfully'}))
} );

app.patch('/movies/:id', (req, res) => {
    let movieID = req.params.id;
    let newMovie = req.body

    knex('movies_table')
    .where('id', movieID)
    .update({
        'title' : newMovie.title
    })
    .then(() => res.json(newMovie))
} );