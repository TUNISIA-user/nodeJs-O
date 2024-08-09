

const express = require("express")
// init app 

const app = express();

const books = [
    {id : 1,title:"sexEdcution"},
    {id : 2,title:"Hitman"},
    {id : 3,title:"Super_Hero"},
    
]

app.get("/",(req,res)=>{
    res.send("hello welcome to epxress js AND hello world ")
})

app.get("/api/book",(req,res)=>{
   res.send(books)
     

})  

app.get("/api/books/:id",(req,res)=>{
    const result = books.find(item => item.id === parseInt(req.params.id))
    if(result){
       res.status(200).send(result)
    }else{
       res.status(404).send("we dont found this book in this data bases")
    }
    

}) 


 
const Port = 5000
app.listen(Port,()=>console.log(`hello from port ${Port}`))