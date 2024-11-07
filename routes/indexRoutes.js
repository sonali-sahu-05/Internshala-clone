const express=require("express");
const { 
    homepage,
    currentUser,
    studentsignup,
    studentsignin,
    studentsignout,
    studentsendmail ,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
// studentdelete,
applyinternship,
applyjob,
} = require("../Controllers/indexContoller");
const { isAuthenticated } = require("../middlewares/auth");
const router=express.Router();

// Get / Route

router.get("/",homepage)


// post /student

router.post("/student",isAuthenticated,currentUser)

// post /student/Signup
router.post("/student/Signup",studentsignup)

// post /student/Signin
router.post("/student/Signin",studentsignin)

// post /student/Signout
router.get("/student/Signout",isAuthenticated,studentsignout)

// post /student/send-mail
router.post("/student/Send-mail",studentsendmail)

// get /student/forget-link/:studentid
router.get("/student/forget-link/:id",studentforgetlink)

// post /student/reset-password/:studentid
router.post("/student/reset-password/:id",isAuthenticated,studentresetpassword)

// post /student/update/:studentid
router.post("/student/update/:id",isAuthenticated,studentupdate)

// post /student/avatat/:studentid
router.post("/student/avatar/:id",isAuthenticated,studentavatar)



// router.post("/student/delete",isAuthenticated,studentdelete)


// .............................apply internship...................

// post /student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid",isAuthenticated,applyinternship)


// ...............................apply jobs........................ 


// post /student/apply/job/:jobid
router.post("/student/apply/job/:jobid",isAuthenticated,applyjob)


module.exports=router; 