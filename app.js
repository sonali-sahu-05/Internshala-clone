require("dotenv").config({path:"./.env"})
const express=require("express")
const  app=express();


// Db connection

require("./models/database").connectDatabase();


// logger

const logger=require("morgan");
app.use(logger("tiny"))


// Body parser hmesa routes se upar ata he
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Session and cookies (npm i --save  express-session cookie-parser jsonwebtoken)
const session=require("express-session");
const cookieparser=require("cookie-parser")

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET
}));

// cookies activation : cookies is something that genrate a code in bakend me that code willl save in browser jb tk vo code(string browser me he) jb tk user login rahega us code ko apn chek krte he ki vo expire to ni hua

app.use(cookieparser());

// express file-uploade

const fileupload=require("express-fileupload")
app.use(fileupload());


// routes
app.use("/user",require("./routes/indexRoutes"))
app.use("/resume",require("./routes/resumeRoutes"))
app.use("/employe",require("./routes/employeRoutes"))


// error handling
const Errorhandler = require("./utils/ErrorHandle");
const { generatedErrors } = require("./middlewares/error");

app.all("*",(req,res,next)=>{
    next(new Errorhandler(`Requested URL not Found ${req.url}`,404))
})
app.use(generatedErrors)

app.listen(
    process.env.PORT,console.log(`Server runing at PORT ${process.env.PORT}` )
)

