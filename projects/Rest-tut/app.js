const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
require('dotenv/config');


app.use(express.json())
// import routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);


// //middlewares, fn that run when we hit a route
// app.use('/posts', () => {
//     console.log('this is middleware running')
// })




//routes
app.get('/', (req, res) => {
    res.send('We are on home');
})


//connect to db
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('connected to db')
)


// how do we start listening to the server
app.listen(3000);