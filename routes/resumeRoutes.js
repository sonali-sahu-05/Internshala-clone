const express=require("express");
const router=express.Router();

const {resume,addeducation,editeducation,deleteeducation,addjobs,
    editjobs,deletejobs,addinternship,editinternship,deleteinternship,addresposiblities,editresposiblities,deleteresposiblities,
addcourses,editcourses,deletecourses,addprojects,editprojects,deleteprojects,addskills,editskills,deleteskills,addaccomplishments,
editaccomplishments,deleteaccomplishments} = require("../Controllers/resumeContoller");
const { isAuthenticated } = require("../middlewares/auth");

// Get / Route

router.get("/",isAuthenticated,resume)
// .......................................education routes..................

// Post /add-education

router.post("/add-education",isAuthenticated,addeducation)

// post /edit-education/:eduid

router.post("/edit-education/:eduid",isAuthenticated,editeducation);

// post  /delete-education/:eduid

router.post("/delete-education/:eduid",isAuthenticated,deleteeducation);

// .........................................Job routes......................


// post /add-jobs
router.post("/add-jobs",isAuthenticated,addjobs);

// post /edit-jobs/:jobid

router.post("/edit-jobs/:jobid",isAuthenticated,editjobs);
// post  /delete-education/:jobid

router.post("/delete-jobs/:jobid",isAuthenticated,deletejobs);

// ......................................Internship routes...................

// post /add-intern
router.post("/add-intern",isAuthenticated,addinternship);

// post /edit-intern/:internid

router.post("/edit-intern/:internid",isAuthenticated,editinternship);
// post  /delete-intern/:internid

router.post("/delete-intern/:internid",isAuthenticated,deleteinternship);


// ......................................resposiblities routes...................

// post /add-respons
router.post("/add-respons",isAuthenticated,addresposiblities);

// post /edit-respons/:responsid

router.post("/edit-respons/:responsid",isAuthenticated,editresposiblities);
// post  /delete-respons/:responsid

router.post("/delete-respons/:responsid",isAuthenticated,deleteresposiblities);

// .................................courses routes................................
// post /add-course
router.post("/add-course",isAuthenticated,addcourses);

// post /edit-course/:courseid

router.post("/edit-course/:courseid",isAuthenticated,editcourses);
// post  /delete-course/:courseid

router.post("/delete-course/:courseid",isAuthenticated,deletecourses);

// .................................projects routes................................
// post /add-project
router.post("/add-project",isAuthenticated,addprojects);

// post /edit-project/:projectid

router.post("/edit-project/:projectid",isAuthenticated,editprojects);
// post  /delete-project/:projectid

router.post("/delete-project/:projectid",isAuthenticated,deleteprojects);

// ................................skills routes............................

// post /add-skill
router.post("/add-skill",isAuthenticated,addskills);

// post /edit-skill/:skillid

router.post("/edit-skill/:skillid",isAuthenticated,editskills);
// post  /delete-skill/:skillid

router.post("/delete-skill/:skillid",isAuthenticated,deleteskills);

// .............................accomplishments routes......................

// post /add-accom
router.post("/add-accom",isAuthenticated,addaccomplishments);

// post /edit-accom/:accomid

router.post("/edit-accom/:accomid",isAuthenticated,editaccomplishments);
// post  /delete-accom/:accomid

router.post("/delete-accom/:accomid",isAuthenticated,deleteaccomplishments);

module.exports=router; 