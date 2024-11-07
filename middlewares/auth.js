const jwt=require("jsonwebtoken");
const Errorhandler=require("../utils/ErrorHandle");
const { catchAsyncError } = require("./catchAsyncError");

// Created is authenticate function

exports.isAuthenticated=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(
            new Errorhandler("Please login in to access the resource",401)    
        );
    }
    const {id}=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.id=id;
    // res.json({id,token})
    next()
})