require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kongzhikeng:Terryhunt829@cluster0.kzu1tba.mongodb.net/carolsBookstore?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(!err) {
    console.log("Successful connection with MongoDB Server");  
  }
  else {
      console.log("Error with MongoDB's connectivity");
      console.log(err)
  }
});
