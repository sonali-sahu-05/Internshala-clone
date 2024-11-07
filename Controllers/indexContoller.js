const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Student=require("../models/studentModel");
const Internship=require("../models/internshipModel");
const Job=require("../models/jobModel"); 
const Errorhandler = require("../utils/ErrorHandle");
const { sendtokens } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path=require("path")
const imagekit=require("../utils/ImageKit").initimagekit()

exports.homepage=catchAsyncError(async(req,res,next)=>{
    res.json({message:" Secured Homepage"});
})

exports.currentUser=catchAsyncError(async(req,res,next)=>{
    const student= await Student.findById(req.id).exec()
    res.json({student});
})

exports.studentsignup=catchAsyncError(async(req,res,next)=>{
    const student= await new Student(req.body).save();
    // res.status(201).json(student)
    sendtokens(student,201,res)
})

exports.studentsignin=catchAsyncError(async(req,res,next)=>{
    const student= await Student.findOne({email:req.body.email})
    .select("+password")
    .exec();

    if (!student) return next(new Errorhandler("User not found by this email address",404))

    const isMatch=student.comparepassword(req.body.password)

    if(!isMatch) return next(new Errorhandler("Wrong Password",402))
    // res.json(student)
    sendtokens(student,200,res)

})

exports.studentsignout=catchAsyncError(async(req,res,next)=>{
    res.clearCookie("token");
    res.json({message:"Succesfully signout"})
})


exports.studentsendmail=catchAsyncError(async(req,res,next)=>{
    const student= await Student.findOne({email:req.body.email}).exec();

    if (!student) return next(new Errorhandler("User not found by this email address",404))

    const url=`${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`

    sendmail(req,res,next,url);
    student.resetPasswordToken=1
    await  student.save()
    res.json({student,url})
})

exports.studentforgetlink=catchAsyncError(async(req,res,next)=>{
    const student= await Student.findById(req.params.id).exec();

    if (!student) return next(new Errorhandler("User not found by this email address",404))

    
    if(student.resetPasswordToken==1){
        student.resetPasswordToken=0;   
        student.password=req.body.password;
        await student.save();
    }else{
        return next(
            new Errorhandler("Invalid Reset password link! please try again",500 )
        )
    }
   res.status(200).json({
    message:"Password changed succesfully"
   })
})

exports.studentresetpassword=catchAsyncError(async(req,res,next)=>{
    const student= await Student.findById(req.id).exec();
    student.password=req.body.password;
    await student.save();

    sendtokens(student,200,res) 
})


exports.studentupdate=catchAsyncError(async(req,res,next)=>{
    await Student.findByIdAndUpdate(req.params.id,req.body).exec();
    res.status(200).json({
        sucess:true,
        message:"Student update Suceesfully",
       
    })
    // sendtokens(student,201,res)
}) 


exports.studentavatar=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.params.id).exec()
    const file=req.files.avatar
    const modifiedFileName=`resumebuilder-${Date.now()}${path.extname(file.name)}`

    if(student.avatar.fileId!==""){
        await imagekit.deleteFile(student.avatar.fileId)
    }

    const {fileId,url}=await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName
    })

    student.avatar={fileId,url}
    await student.save()    
    // res.json({image})
    res.status(200).json({
        sucess:true,
        message:"Profile Uploded Succesfully"
       })
})

// exports.studentdelete=catchAsyncError(async(req,res,next)=>{
//     const student=await Student.findById(req.id).exec();
//     student.internships.forEach
//     // const student= await Student.findByIdAndDelete(req.id).exec();
//     // const internship = await Internship.findOneAndDelete()
//     res.json({student});
// })

// .............................apply internships..................


exports.applyinternship=catchAsyncError(async(req,res,next)=>{
    const student= await Student.findById(req.id).exec()
    const internship= await Internship.findById(req.params.internshipid).exec() ;
    student.internships.push(internship._id);
    internship.students.push(student._id);
    await student.save()
    await internship.save()
    res.json({student,internship});
})

// .............................apply jobs..................

exports.applyjob=catchAsyncError(async(req,res,next)=>{
    const student= await Student.findById(req.id).exec()
    const job= await Job.findById(req.params.jobid).exec() ;
    student.jobs.push(job._id);
    job.students.push(student._id);
    await student.save()
    await job.save()
    res.json({student,job});
})