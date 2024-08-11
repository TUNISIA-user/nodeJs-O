
// init app 
const express = require("express")
const booksPath = require("./routes/books")
const authorsPath = require("./routes/authors")
const mongoose  = require("mongoose")
 

// Connection to   DataBase

mongoose.connect("mongodb://localhost/booksStoreDb")
.then(()=>console.log("Connected to MongoDb ..."))
.catch((eroor)=>console.log(`Connection Faield to MongoDB! ${eroor}`))



// init app 
const app = express();
// Apply Middlewares  
app.use(express.json())
// Routes 














 







app.use("/api/books",booksPath)
app.use("/api/authors",authorsPath)
 
const Port = 5000
app.listen(Port,()=>console.log(`hello from port ${Port}`))