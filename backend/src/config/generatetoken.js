const jwt= require('jsonwebtoken');


const generatetoken= async(id)=>{
    return jwt.sign({id}, 'EFHDSNLF',{expiresIn:"30d"})
}

module.exports= generatetoken;
