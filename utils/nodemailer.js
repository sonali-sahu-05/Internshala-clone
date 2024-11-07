const nodemailer=require("nodemailer")
const { create } = require("../models/studentModel");
const Errorhandler = require("./ErrorHandle");

exports.sendmail=(req,res,next,url)=>{
    const transport=nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        post:465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD,
        },
    });
    const mailOptions={
        from:"Rohit pvt limited",
        to:req.body.email,
        subject:"Password reset link",
        // text:"Do not share link",
        html:`<h1>Click link to below to reset password</h1>
        <a href="${url}">Password reset link</a>`
        
    };

    transport.sendMail(mailOptions,(err,info)=>{
        if(err) return next(new Errorhandler(err,500));
        console.log(info);
        return res.status(200).json({
            message:"mail sent succesfully",
            url,
        })
    })
}


