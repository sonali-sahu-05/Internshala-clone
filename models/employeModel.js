const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


const employeModel=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"FirstName  is Required"],
        minLength:[4,"first name should be atleast 4character long"]
    },
    lastname:{
        type:String,
        required:[true,"lastName  is Required"],
        minLength:[4,"last name should be atleast 4character long"]
    },
    contact:{
        type:String,
        required:[true,"Contact  is Required"],
        maxLength:[10,"contact must not exceed 10character "],
        minLength:[10,"contact should be atleast 10character long"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email  is Required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         'Please fill a valid email address']
    },
    password:{
        type:String,
        select:false,
        maxLength:[15,"Password shhould not exceed more then 15 characters"],
        minLength:[6,"Password shhould have atleast  then 6 characters"],
        required:[true,"password  is Required"],

        // match: 
    },
    resetPasswordToken:{
        type:Number,
        default:0
    },
    organizationname:{
        type:String,
        required:[true,"organizationname  is Required"],
        minLength:[4,"organization name should be atleast 4character long"]
    },
    organizationlogo:{
        type:Object,
        default:{
            fileId:"",
            url:"https://plus.unsplash.com/premium_photo-1676690618005-c6bfc28347b9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    internships:[
        {type:mongoose.Schema.Types.ObjectId,ref:"internship"}
    ],
    jobs:[
        {type:mongoose.Schema.Types.ObjectId,ref:"job"}
    ]
    
},{timestamps:true})

//npm i bcryptjs for bcrypt the password so no body can access


employeModel.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt=bcrypt.genSaltSync(10);
    this.password=bcrypt.hashSync(this.password,salt)
})

employeModel.methods.comparepassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

// Create and call JSONWEBTOKEN (sign)
employeModel.methods.getjwttoken=function(){
return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRE,
})
}; 
const Employe=mongoose.model("employe",employeModel)

module.exports=Employe