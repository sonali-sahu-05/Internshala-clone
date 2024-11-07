// ye jab chalega jb user login hoga or register hoga 
// yha apn ne call kiya he gettokens function ko
exports.sendtokens=(User,statuscode,res)=>{
    const token=User.getjwttoken();
    // res.json({token});
    const options={
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24*60*60*1000
        ),
        httpOnly:true,
        // local host =============================(secure true)
        // secure:true,
    }
    res.status(statuscode).cookie("token",token,options).json({sucess:true,id:User._id,token})
}

