const express=require('express');
const port=8080;
const router=express.Router();

const app=express();


app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server is running up at port ${port}`)
})