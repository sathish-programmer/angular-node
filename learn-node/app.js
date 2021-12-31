const { config } = require("dotenv");
const express = require("express");
const mongoose = require("mongoose")
const app = express();
require("dotenv/config");
const cors = require("cors");
const body_parser = require("body-parser");
// import routes
const routePost = require("./routes/posts");
const authRoutes = require("./auth/auth");

// middlewares
// app.use(cors);
app.use(body_parser.json());
app.use('/posts', routePost);
app.use('/api/user', authRoutes);

// routes
app.get('/', (req, res)=>{
    res.send('we r in home');
});

// connect to database
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true}).then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

// listen port
app.listen(7000, ()=>{
    console.log(" port running")
});