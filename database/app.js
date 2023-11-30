const express = require('express');
const app = express();
const port = 8081 ;
const cors = require("cors");

app.use(express.json());

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
); 


let christmasMovies = [
    {
        "id": 1,
        "title": "Polar Express",
        "year": 2004,
    },
    {
        "id": 2,
        "title": "Elf",
        "year": 2003, 
    },
    {
        "id": 3,
        "title": "Home Alone",
        "year": 1990,
    },
    {
        "id": 4,
        "title": "It's a Wonderful Life",
        "year": 1946,
    }
];


app.listen(port, () => {
    console.log(`Your applciation is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.send(`Your application is running`)
})

app.get('/movies', (req, res) => {
    res.send(christmasMovies)
})

