

const express  =require("express")
const router = express.Router()
const Joi = require("joi")



const {Author }  = require("../models/Author") //  import this Auther from model 



const authors  = [

     {id : 1,firstName:"Nassim",lastName : "nahdi",nat:"tunisia",image:"dafault-iamge1.png"},
     {id : 2,firstName:"Ghaith",lastName : "khaled",nat:"russia",image:"dafault-iamge2.png"},
     {id : 3,firstName:"ranim",lastName : "mayden",nat:"italia",image:"dafault-iamge3.png"},
     {id : 4,firstName:"khalil",lastName : "jolya",nat:"paris",image:"dafault-iamge4.png"},
     
]



/**
 *  @desc Get all authors 
 *  @route /api/authors
 *  @method Get
 *  @access  public 
 * 
 * 
 * 
 * 
 */
 
router.get("/",async(req,res)=>{
 try{
    const FetchDataBases = await Author.find().sort({firstName: 1 }).select("firstName lastName _id nat");
    console.log(FetchDataBases)
   
    res.status(200).json(FetchDataBases)    //  response all dat for each users get request 
      
 }
 catch(eroor){
    console.log(`this error in this server ${eroor}`)
 }
 
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






/**
 *  @desc Get  authors  id  
 *  @route /api/authors/:id
 *  @method Get   by id 
 *  @access  public 
 * 
 * 
 * 
 * 
 */

router.get("/:id",async(req,res)=>{

      const autherList = await Author.find()            
    
      const result = autherList.find(item => item.id == req.params.id)
      result ? res.status(200).json(result)  :  res.status(404).json("we dont found this book in this data bases") 
        
    // try{
    //   const TestData = await Author.findById(req.params.id)
    //   TestData ? res.status(200).json(TestData)  :  res.status(404).json("we dont found this book in this data bases") 
       
    // }
    // catch(eroor){
    //     console.log(`this error should be ${eroor}`)
    // }
    



})


function ValidateCreateBookx (obj){
    const schema = Joi.object({
        id: Joi.number().min(1).max(200).required(),
        firstName : Joi.string().min(3).max(200).required().trim(),
        lastName  : Joi.string().min(3).max(200).required().trim(),
        nat  : Joi.string().min(3).max(200).required().trim(),
        image   : Joi.string().min(3).max(200).required().trim()
    });


    return  schema.validate(obj);

}


function ValidateUpdateBooky(obj){
    const schema = Joi.object({
        id: Joi.number().min(1).max(200),
        firstName : Joi.string().min(3).max(200).trim(),
        lastName  : Joi.string().min(3).max(200).trim(),
        nat  : Joi.string().min(3).max(200).trim(),
        image   : Joi.string().min(3).max(200).trim()
    });


    return  schema.validate(obj);
}


/**
 *  @desc create new authors 
 *  @route /api/authors
 *  @method POST
 *  @access  public 
 * 
 */
router.post("/",async(req,res)=>{
          
   
 
    
   try{
    const authors1 = new Author  ({

        id :req.body.id,
        firstName : req.body.title,
        lastName : req.body.lastName,
        nat : req.body.nat,
        image : req.body.image

    })
     
   const result =  await   authors1.save()
    
    

    res.status(201).json(result)// created successfully
   } catch(err){
    console.log(error)
    res.status(500).json({message: "Something went wrong here"})
   }
  
}) 







const  RetrunData = (data)=> authors.find(b=>b.id ===parseInt(data)) 
 
router.put("/:id",(req,res)=>{
    
    const  { error}  = ValidateUpdateBooky(req.body)
    
    error &&  res.status(400).json({message : error.details[0].message})
    RetrunData(req.params.id) ? res.status(200).json({message : "book has been update"}) :  res.status(404).json({message :"book not found "})

})

 
router.delete("/:id",(req,res)=>{
    
    const  { error}  = ValidateUpdateBooky(req.body)
    error &&  res.status(400).json({message : error.details[0].message})
    RetrunData(req.params.id) ? res.status(200).json({message : "book has been update"}) :  res.status(404).json({message :"book not found "})

})


module.exports = router