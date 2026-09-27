// Importing express package
const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors');  
const aiRoutes = require('./routes/ai')   

// Routes
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

dotenv.config()
console.log("ENV EMAIL:", process.env.EMAIL)
console.log("ENV PASS:", process.env.PASS ? "Loaded" : "Not Loaded")

// Express APP
const app = express()

// PORT num
const PORT = process.env.PORT

// middleware
app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes (http://localhost:4000/)
app.get('/', (req, res) => {
    res.json({ msg: 'Welcome  to our appln' })
})

app.use('/api/workouts', workoutRoutes);
app.use('/api/user',userRoutes)
app.use('/api/ai', aiRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`Server is up and listening at: http://localhost:${PORT} & connected to our db`);
        });
    })
    .catch((error) => {
        console.log(error)
    })





