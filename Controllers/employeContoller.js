const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Employe=require("../models/employeModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const Errorhandler = require("../utils/ErrorHandle");
const { sendtokens } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path=require("path")
const imagekit=require("../utils/ImageKit").initimagekit()

// Export homepage
exports.homepage=catchAsyncError(async(req,res,next)=>{
    res.json({message:" Secured employe Homepage"});
})


// Export current employe

exports.currentemploye=catchAsyncError(async(req,res,next)=>{
    const employe= await Employe.findById(req.id).exec()
    res.json({employe});
})

// Export employesignup
exports.employesignup=catchAsyncError(async(req,res,next)=>{
    const employe= await new Employe(req.body).save();
    // res.status(201).json(employe)
    sendtokens(employe,201,res)
})

// Export employesignin

exports.employesignin=catchAsyncError(async(req,res,next)=>{
    const employe= await Employe.findOne({email:req.body.email})
    .select("+password")
    .exec();

    if (!employe) return next(new Errorhandler("User not found by this email address",404))

    const isMatch=employe.comparepassword(req.body.password)

    if(!isMatch) return next(new Errorhandler("Wrong Password",402))
    // res.json(student)
    sendtokens(employe,200,res)

})

// Export employesignout

exports.employesignout=catchAsyncError(async(req,res,next)=>{
    res.clearCookie("token");
    res.json({message:"Succesfully signout"})
})

// Export employesendmail


exports.employesendmail=catchAsyncError(async(req,res,next)=>{
    const employe= await Employe.findOne({email:req.body.email}).exec();

    if (!employe) return next(new Errorhandler("User not found by this email address",404))

    const url=`${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`

    sendmail(req,res,next,url);
    employe.resetPasswordToken=1
    await  employe.save()
    res.json({employe,url})
})

// Export employeforgetlink

exports.employeforgetlink=catchAsyncError(async(req,res,next)=>{
    const employe= await Employe.findById(req.params.id).exec();

    if (!employe) return next(new Errorhandler("User not found by this email address",404))

    
    if(employe.resetPasswordToken==1){
        employe.resetPasswordToken=0;   
        employe.password=req.body.password;
        await employe.save();
    }else{
        return next(
            new Errorhandler("Invalid Reset password link! please try again",500 )
        )
    }
   res.status(200).json({
    message:"Password changed succesfully"
   })
})

// Export employeresetpassword

exports.employeresetpassword=catchAsyncError(async(req,res,next)=>{
    const employe= await Employe.findById(req.id).exec();
    employe.password=req.body.password;
    await employe.save();

    sendtokens(employe,200,res) 
})

// Export employeupdate

exports.employeupdate=catchAsyncError(async(req,res,next)=>{
    await Employe.findByIdAndUpdate(req.params.id,req.body).exec();
    res.status(200).json({
        sucess:true,
        message:"employe update Suceesfully",
       
    })
    // sendtokens(student,201,res)
}) 

// Export employevtar

exports.employeavatar=catchAsyncError(async(req,res,next)=>{
    const employe=await Employe.findById(req.params.id).exec()
    const file=req.files.organizationlogo
    const modifiedFileName=`organization-${Date.now()}${path.extname(file.name)}`

    if(employe.organizationlogo.fileId !== ""){
        await imagekit.deleteFile(employe.organizationlogo.fileId)
    }

    const {fileId,url} =await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName
    })

    employe.organizationlogo={fileId,url}
    await employe.save()    
    // res.json({image})
    res.status(200).json({
        sucess:true,
        message:"Profile Uploded Succesfully"
       })
}) 


// ..................................................................................................................
// ....................................Internships....................................................................
// ...................................................................................................................

exports.createinternship = catchAsyncError(async(req,res,next)=>{
    const employe= await Employe.findById(req.id).exec()
    const internship= await new Internship(req.body)
    employe.internships.push(internship._id);
    internship.employe=employe._id;
    await internship.save()
    await employe.save()
    res.status(201).json({sucess:true,internship})

})

exports.readinternship=catchAsyncError(async(req,res,next)=>{
    const {internships}= await Employe.findById(req.id).populate("internships").exec()
    res.status(201).json({sucess:true,internships})
    
})

exports.readsingleinternship=catchAsyncError(async(req,res,next)=>{
    const internship= await Internship.findById(req.params.id).exec();
    res.status(201).json({sucess:true,internship})
    
})


// .......................................................................................................
// ....................................JOBS..............................................................
// ....................................................................................................


exports.createjob = catchAsyncError(async(req,res,next)=>{
    const employe= await Employe.findById(req.id).exec()
    const job= await new Job(req.body)
    employe.jobs.push(job._id);
    job.employe=employe._id;
    await job.save()
    await employe.save()
    res.status(201).json({sucess:true,job})

})

exports.readjob=catchAsyncError(async(req,res,next)=>{
    const {jobs}= await Employe.findById(req.id).populate("jobs").exec()
    res.status(201).json({sucess:true,jobs})
    
})

exports.readsinglejob=catchAsyncError(async(req,res,next)=>{
    const job= await Job.findById(req.params.id).exec();
    res.status(201).json({sucess:true,job})
    
})