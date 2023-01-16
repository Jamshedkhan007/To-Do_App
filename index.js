const e = require('express');
const express=require('express');
const port=8000;

// importing the Database
const db=require('./config/mongoose');

// importing the Schema for tasks
const Task=require('./models/task');

// using Expres server
const app=express();

// using static file 
app.use(express.static("./views"));

// to use encrypted data
app.use(express.urlencoded());

// set up view engine
app.set("view engine","ejs");
app.set("views","./views")

// rendering the app page
app.get("/",function(req,res){
    Task.find({},function(err,task){
        if(err){
            console.log(`Error in fetching task from db : ${err}`);
        }
        return res.render('home',{
            task:task
        })
    })
})

// creating a task
app.post('/create-task',(req,res)=>{
    // console.log("creating a task")

    Task.create({
        description:req.body.description,
        category:req.body.category,
        date:req.body.date
    },(err,newtask)=>{
if(err){
    console.log(`Error in Creating task : ${err}`);
    return;
}
return res.redirect('back');
    });
});

// Deleting a task
app.get('/delete-task',(req,res)=>{
    // get id from query
    var id =req.query;

    // checking the number of task selected to delete
    var count=Object.keys(id).length;
    for(let i=0;i<count;i++){

        // find and delete task from db
        Task.findByIdAndDelete(Object.keys(id)[i],(err)=>{
            if(err){
                console.log("Error in Deleting Task");
            }
        })
    }
    return res.redirect('back');
})




// Run the server
app.listen(port,function(err){
    if(err){
        console.log(`Error The server Not Runnin : ${err}` );
    }
    console.log(`Server Working on Port : ${port}`);
})