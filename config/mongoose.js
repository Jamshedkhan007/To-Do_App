// requir the library
const mongoose=require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/todos');

// aquire the connection (to if check if is successfull)
const db=mongoose.connection;

// If its show error
db.on('error',console.error.bind(console,"Error in connecting to mongodb"));

// up and running then print message
db.once('open',function(){
    console.log('Connected to database');
});

// Exporting the database
module.exports=db;
