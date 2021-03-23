const jwt = require('jsonwebtoken');
const env = require('dotenv');

exports.requireSignin = (req,res,next)=>{
    if(req.headers.cookie){
        const token = req.headers.cookie.split(" ")[1];
        var user=""; 
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
            user= decoded;
        });
        if(user==="") return res.json({ message: "Wrong Token Or Token Expired" });
        else{
            next();
        }

    }else{
        return res.json({message : 'Authorization required'});
    }
   
}

