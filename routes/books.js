const express  =require("express")
const router = express.Router()
const Joi = require('joi');



 








const books = [
    {id : 1,title:"sexEdcution"},
    {id : 2,title:"Hitman"},
    {id : 3,title:"Super_Hero"},
    
]

/**
 *  @desc Get all books 
 *  @route /api/books
 *  @method Get
 *  @access  public 
 * 
 * 
 * 
 * 
 */
 
router.get("/",(req,res)=>{
   res.status(200).send(books)
     

})  


// validate Create Book
function ValidateCreateBook (obj){
    const schema = Joi.object({
        id: Joi.number().min(1).max(200).required(),
        title: Joi.string().min(3).max(200).required().trim()
    });


    return  schema.validate(obj);

}


//---------------
 
function ValidateUpdateBook (obj){
    const schema = Joi.object({
        id: Joi.number().min(1).max(200),
        title: Joi.string().min(3).max(200)
    });


    return  schema.validate(obj);

}






//-------------------



/**
 *  @desc Get  books  id  
 *  @route /api/books/:id
 *  @method Get
 * @access  public 
 * 
 * 
 * 
 * 
 */

router.get("/:id",(req,res)=>{
    const result = books.find(item => item.id === parseInt(req.params.id))
    if(result){
       res.status(200).send(result)
    }else{
       res.status(404).send("we dont found this book in this data bases")
    }
    

}) 


/**
 *  @desc create new book 
 *  @route /api/books
 *  @method POST
 * @access  public 
 * 
 */
router.post("/",(req,res)=>{
          
   

        const { error } =ValidateCreateBook(req.body);

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

// put and delte request 



/**
 *  @desc Update a Book 
 *  @route /api/books/:id
 *  @method PUT
 * @access  public 
 * 
 */
 const  RetrunData = (data)=> books.find(b=>b.id ===parseInt(data)) 
 
  router.put("/:id",(req,res)=>{

  const  { error}  = ValidateUpdateBook(req.body)
  error &&  res.status(400).json({message : error.details[0].message})
  RetrunData(req.params.id)?res.status(200).json({message : "book has been update"}) :  res.status(404).json({message :"book not found "})
       
})


/**
 *  @desc Delte a Book 
 *  @route /api/books/:id
 *  @method Delete
 * @access  public 
 * 
 */
 
 router.delete("/:id",(req,res)=>{
    const  { error}  = ValidateUpdateBook(req.body)
     
    error &&  res.status(400).json({message : error.details[0].message})
 
    const book =RetrunData(req.params.id)
   
    book  ?  res.status(200).json({message : "book has been update"}) : res.status(404).json({message :"book not found "})
 
  })
  
  
  







module.exports = router;