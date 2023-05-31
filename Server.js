const express =require('express')
//In Node.js, require is a special function that allows you to 
//include external modules in your application. 
const app=express() 


//Routes
app.get('/',(req,res)=>{
res.send('hello node API!!!!')
})
//get route

app.listen(3002,()=>{
    console.log('Node api is running!!');
})