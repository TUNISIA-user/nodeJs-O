

const express = require("express")

const Joi = require('joi');

// init app 

const app = express();
app.use(express.json())


const books = [
    {id : 1,title:"sexEdcution"},
    {id : 2,title:"Hitman"},
    {id : 3,title:"Super_Hero"},
    
]

 

app.get("/api/book",(req,res)=>{
   res.status(200).send(books)
     

})  

app.get("/api/books/:id",(req,res)=>{
    const result = books.find(item => item.id === parseInt(req.params.id))
    if(result){
       res.status(200).send(result)
    }else{
       res.status(404).send("we dont found this book in this data bases")
    }
    

}) 


app.post("/api/books",(req,res)=>{
          
    const schema = Joi.object({
        id: Joi.number().min(1).max(200).required(),
        title: Joi.string().min(3).max(200).required().trim()
    });


         const { error } = schema.validate(req.body);

        if(error){
            return res.status(400).json({message : error.details[0].message})
        }

        const book = {
            id :req.body.id,
            title : req.body.title,
    
        }
        
        books.push(book)
        res.status(201).json(book)// created successfully
        console.log(books)
      
}) 

 
const Port = 5000
app.listen(Port,()=>console.log(`hello from port ${Port}`))