const user=require("../utils/usermodel")
const contactinfo=require('../utils/contactSchema')
const bcrypt= require('bcryptjs')
 
const auth=async(req,res)=>{
    try {
        
        const { username,email,phoneno,password }=req.body//firstly get data
        const userexist=await user.findOne({email:email})

         if(userexist){
            console.log(email)
            return res.send("email already exists")
            
         }
          const hashedpassword=await bcrypt.hash(password,10)
          console.log(user)
         
         const userCreated = await user.create({ username, email, phoneno, password:hashedpassword });
         const hash=await user.create()

         res.status(201).json({msg: userCreated,token: await userCreated.generatetoken()});
         console.log(req.body);
        

         

    } catch (error) {
        console.log(error)
        res.status(400).send("error in application")
    }
};
const register=async(req,res)=>{
    try {
        res.status(200).send("registeration")
        
    } catch (error) {
       res.status(400).send("error")        
    }
};
const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const userexist=await user.findOne({email})
       
        if(!userexist)
            {
                return res.json("invalid credentials")
            }
             
        const ispassword=await bcrypt.compare(password,userexist.password)
       
        if(ispassword){
            res.json({
                msg:"login successfull",
                token:await userexist.generatetoken(),
                userid:userexist._id
            })
            
        }
        else{
            console.log("wrong credentials")
            res.json({
                msg:"wrong credentials"
            })
            
        }
    } catch (error) {
        await res.status(400).json({msg:"internal server"})
        
    }

}
const contact=async(req,res)=>{
    try {
    const {username,email,message}=req.body;
    const contact=req.body;
    await contactinfo.create(contact)
    
        
    } catch (error) {
        console.error(error)
    }
    
}
const User=(req,res)=>{
    try {
    const userdata=req.user;
    console.log("userdta",userdata);
    return res.json({userdata});
        
    } catch (error) {
        console.log(error)
        
    }

}



module.exports={auth,register,login,contact,User};
