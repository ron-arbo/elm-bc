const express = require('express')
const mongoose = require('mongoose')
const secrets = require('../frontend/secrets.json')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// Start listening on port 5000
app.listen(5000)

// Connect to DB
mongoose.connect(secrets.dbConnect, 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {
        console.log("Connected to DB!")
    }
)

// Import Routes
const postRoutes = require('./routes/posts')

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use('/posts', postRoutes)

// Default Routes
app.get('/', (req, res) => {
    res.send("Congrats")
})
