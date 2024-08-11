

const express  =require("express")
const router = express.Router()
const Joi = require("joi")
const asyncHnale = require("express-async-handler")


const {Author }  = require("../models/Author") //  import this Auther from model 

// do asyncHandler
 


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
 
router.get("/",async(req,res)=>{  // get data from data bases
 try{
    const FetchDataBases = await Author.find()//.sort({firstName: 1 }).select("firstName lastName _id nat");
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




/**
 *  @desc update  authors 
 *  @route /api/authors
 *  @method PUT
 *  @access  public 
 * 
 */


 
 
router.put("/:id", async (req, res) => {
    const { error } = ValidateUpdateBooky(req.body);
    
   
    error &&  res.status(400).json({ message: error.details[0].message });
   

    try {
        const author = await Author.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    nat: req.body.nat,
                    image: req.body.image,
                },
            },
            { new: true }  // This option ensures the updated document is returned
        );
        console.log(author)
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.status(200).json(author);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});








/**
 *  @desc delete  authors 
 *  @route /api/authors
 *  @method PUT
 *  @access  public 
 * 
 */



 
router.delete("/:id",async(req,res)=>{
    
    const  { error}  = ValidateUpdateBooky(req.body)
    error &&  res.status(400).json({message : error.details[0].message})
    const author  = await Author.findById(req.params.id)
    try{
        if(author){
              await Author.findByIdAndDelete(req.params.id)
            res.status(200).json({message:  "auhtor has been deleted"})
        }else{
            res.status(404).json({message: "author not found"})
        }
       
    }
    catch(error){
        console.log(`The eroor was ${error}`)
    }


})


module.exports = router