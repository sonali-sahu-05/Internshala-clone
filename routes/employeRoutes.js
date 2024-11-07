const express=require("express");
const { 
    homepage,
    employesignup,
    employesignin,
employesignout,
currentemploye,
employesendmail,
employeforgetlink,
employeresetpassword,
employeupdate,
employeavatar,
createinternship,
readinternship,
readsingleinternship,
createjob,
readjob,
readsinglejob,
 } = require("../Controllers/employeContoller");
const { isAuthenticated } = require("../middlewares/auth");
const router=express.Router();

// Get /employe/ Route

router.get("/",homepage)


// // post /employe/currentemploye

router.post("/currentemploye",isAuthenticated,currentemploye)

// post /employe/Signup
router.post("/Signup",employesignup)

// post /employe/Signin
router.post("/Signin",employesignin)

// post /employe/Signout
router.get("/Signout",isAuthenticated,employesignout)

// // post /employe/send-mail
router.post("/Send-mail",employesendmail)

// // get /employe/forget-link/:employeid
router.get("/forget-link/:id",employeforgetlink)

// // post /employe/reset-password/:employeid
router.post("/reset-password/:id",isAuthenticated,employeresetpassword)

// // post /employe/update/:employeid
router.post("/update/:id",isAuthenticated,employeupdate)

// // post /employe/avatat/:employeid
router.post("/avatar/:id",isAuthenticated,employeavatar)


// ...........................................................................
// .......................internship route....................................
// ...........................................................................


// // post /employe/internship/create
router.post("/internship/create",isAuthenticated,createinternship)


// // post /employe/internship/read
router.post("/internship/read",isAuthenticated,readinternship)

// // post /employe/internship/read/:id
router.post("/internship/read/:id",isAuthenticated,readsingleinternship)

// ...........................................................................
// .......................Jobs route....................................
// ...........................................................................


// // post /employe/job/create
router.post("/job/create",isAuthenticated,createjob)


// // post /employe/job/create
router.post("/job/read",isAuthenticated,readjob)

// // post /employe/job/create
router.post("/job/read/:id",isAuthenticated,readsinglejob)

module.exports=router; 