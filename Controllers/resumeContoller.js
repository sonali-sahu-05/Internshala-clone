const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Student=require("../models/studentModel");
const Errorhandler = require("../utils/ErrorHandle");
const { v4: uuidv4 } = require('uuid');


exports.resume=catchAsyncError(async(req,res,next)=>{   
    const{resume}=await Student.findById(req.id).exec()
    res.json({message:" Secured resume",resume});
})

// Education...........................................................................................

exports.editeducation=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const eduindex=student.resume.education.findIndex(
        (i)=>i.id===req.params.eduid
    );
    student.resume.education[eduindex]={
        ...student.resume.education[eduindex],
        ...req.body,
    }
    await student.save()
    res.json({message:" Education updated"});
})

exports.addeducation=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    student.resume.education.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:" Education Added"});
})


exports.deleteeducation=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const filtereducation=student.resume.education.filter(
        (i)=>i.id !== req.params.eduid
    );
    student.resume.education=filtereducation;
    await student.save()
    res.json({message:" Education deleted"});
})

// Jobs...........................................................................................

exports.addjobs=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    student.resume.jobs.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:" Jobs added"});
})


exports.editjobs=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const jobindex=student.resume.jobs.findIndex(
        (i)=>i.id===req.params.jobid
    );
    student.resume.jobs[jobindex]={
        ...student.resume.jobs[jobindex],
        ...req.body,
    }
    await student.save()
    res.json({message:" Jobs updated"});
})

exports.deletejobs=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const filterJobs=student.resume.jobs.filter(
        (i)=>i.id !== req.params.jobid
    );
    student.resume.jobs=filterJobs;
    await student.save()
    res.json({message:" Job deleted"});
})

// INternship.................................................................................



exports.addinternship=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    student.resume.internships.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:" internships added"});
})


exports.editinternship=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const internindex=student.resume.internships.findIndex(
        (i)=>i.id===req.params.internid
    );
    student.resume.internships[internindex]={
        ...student.resume.internships[internindex],
        ...req.body,
    }
    await student.save()
    res.json({message:" internships updated"});
})


exports.deleteinternship=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const filterintern=student.resume.internships.filter(
        (i)=>i.id !== req.params.internid
    );
    student.resume.internships=filterintern;
    await student.save()
    res.json({message:" internships deleted"});
})


// resposiblities.....................................................................................
exports.addresposiblities=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    student.resume.resposiblities.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"resposiblities added"});
})


exports.editresposiblities=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const responsindex=student.resume.resposiblities.findIndex(
        (i)=>i.id===req.params.responsid
    );
    student.resume.resposiblities[responsindex]={
        ...student.resume.resposiblities[responsindex],
        ...req.body,
    }
    await student.save()
    res.json({message:" resposiblities updated"});
})


exports.deleteresposiblities=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const filterrespons=student.resume.resposiblities.filter(
        (i)=>i.id !== req.params.responsid
    );
    student.resume.resposiblities=filterrespons;
    await student.save()
    res.json({message:" resposiblities deleted"});
})

// Courses...............................................................................
exports.addcourses=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    student.resume.courses.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"courses added"});
})


exports.editcourses=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const courseindex=student.resume.courses.findIndex(
        (i)=>i.id===req.params.courseid
    );
    student.resume.courses[courseindex]={
        ...student.resume.courses[courseindex],
        ...req.body,
    }
    await student.save()
    res.json({message:" courses updated"});
})


exports.deletecourses=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const filtercourse=student.resume.courses.filter(
        (i)=>i.id !== req.params.courseid
    );
    student.resume.courses=filtercourse;
    await student.save()
    res.json({message:"courses deleted"});
})

// projects..............................................................................


exports.addprojects=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    student.resume.projects.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"projects added"});
})

exports.editprojects=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const projectindex=student.resume.projects.findIndex(
        (i)=>i.id===req.params.projectid
    );
    student.resume.projects[projectindex]={
        ...student.resume.projects[projectindex],
        ...req.body,
    }
    await student.save()
    res.json({message:" projects updated"});
})


exports.deleteprojects=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const filterproject=student.resume.projects.filter(
        (i)=>i.id !== req.params.projectid
    );
    student.resume.projects=filterproject;
    await student.save()
    res.json({message:"projects deleted"});
})


// skills..............................................................................


exports.addskills=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    student.resume.skills.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"skills added"});
})

exports.editskills=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const skillindex=student.resume.skills.findIndex(
        (i)=>i.id===req.params.skillid
    );
    student.resume.skills[skillindex]={
        ...student.resume.skills[skillindex],
        ...req.body,
    }
    await student.save()
    res.json({message:" skills updated"});
})


exports.deleteskills=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const filterskill=student.resume.skills.filter(
        (i)=>i.id !== req.params.skillid
    );
    student.resume.skills=filterskill;
    await student.save()
    res.json({message:"skills deleted"});
})


// accomplishments..............................................................................


exports.addaccomplishments=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    student.resume.accomplishments.push({...req.body,id:uuidv4()})
    await student.save()
    res.json({message:"accomplishments added"});
})

exports.editaccomplishments=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const accomindex=student.resume.accomplishments.findIndex(
        (i)=>i.id===req.params.accomid
    );
    student.resume.accomplishments[accomindex]={
        ...student.resume.accomplishments[accomindex],
        ...req.body,
    }
    await student.save()
    res.json({message:" accomplishments updated"});
})


exports.deleteaccomplishments=catchAsyncError(async(req,res,next)=>{
    const student=await Student.findById(req.id).exec()
    const filteraccom=student.resume.accomplishments.filter(
        (i)=>i.id !== req.params.accomid
    );
    student.resume.accomplishments=filteraccom;
    await student.save()
    res.json({message:"skills deleted"});
})