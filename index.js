const express=require('express');
const port=8080;

const app=express();

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server is running up at port ${port}`)
})