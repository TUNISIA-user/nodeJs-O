
const mongoose = require("mongoose");

const AuthorSchema = new  mongoose.Schema({
    firstName : {
        type : String,
        required : true ,
        trim : true ,
        minlength : 3,
        maxlength  :  200
    },
    lastName :  {
        type:String,
        required : true ,
        trim : true ,
        minlength : 3,
        maxlength  :  200
    },
    nat : {
        type:String,
        required : true ,
        trim : true ,
        minlength : 3,
        maxlength  :  200
    },
    image  : {
      type : String,
      default : "default-avatat.png",
    },

     

})

const Author =mongoose.model("Author",AuthorSchema)
module.exports = {
    Author
}