const express=require('express');
const app=express();
const port=8000;

app.get('/',(req,res)=>{
    res.send("hello world")
});

app.set("view engine","ejs");
app.set("views","./views")








// Run the server
app.listen(port,function(err){
    if(err){
        console.log(`Error The server Not Runnin : ${err}` );
    }
    console.log(`Server Working on Port : ${port}`);
})