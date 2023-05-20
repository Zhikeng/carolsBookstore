require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')

const path = require('path');
const methodOverride = require('method-override');

const session = require ('express-session')
const passport = require('passport')

const routes = require('./routes/index');
const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(routes);

app.all('*', (req,res) => {
    res.json({"every thing":"is awesome"})
})

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// require('./config/connection');

// app.listen(PORT, () => {
//     console.log(`The server is listening on port ${PORT}`);
// });

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})




