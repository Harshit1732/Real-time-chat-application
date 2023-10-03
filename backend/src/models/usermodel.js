const mongoose= require('mongoose');

const User= new mongoose.Schema({
   Name:{
     type: String,
     require:true,
   },
   email:{
    type : String,
    required: true
   },
   password:{
      type: Number,
      required: true
   }
})

const user= mongoose.model('user',User);

module.exports = user;