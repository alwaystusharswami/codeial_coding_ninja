const express=require('express');
const port=8080;
const router=express.Router();
const mongoose=require('./config/mongoose')

// ejs layout with express 
const expressLayout=require('express-ejs-layouts');

const app=express();


// middle ware 
app.use(expressLayout);


// set view engine 
app.set('view engine','ejs');
app.set('views','views');

// router calling 
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server is running up at port ${port}`)
})