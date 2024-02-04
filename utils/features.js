
import DatauriParser from "datauri/parser.js"
import path from "path"
import {createTransport} from "nodemailer"

export const getDataUri=(file)=>{
    const parser=new DatauriParser();
    const extName=path.extname(file.originalname).toString();

    return parser.format(extName,file.buffer);
};

export const sendToken=async(user,res,message,statusCode)=>{
    const token =await user.generateToken();
        
    return res.status(statusCode).cookie("token",token,{
        ...cookiesOptions,
     expires:new Date(Date.now()+15*24*60*60*1000)
    }).json({
         success:true,message:message,token,
     })
}

export const cookiesOptions={
    secure:process.env.NODE_ENV==="Development"?false:true,
    httpOnly:process.env.NODE_ENV==="Development"?false:true,
    sameSite:process.env.NODE_ENV==="Development"?false:"none",
}

export const sendEmail=async(subject,to,text)=>{
   const transporter=createTransport({
    host:process.env.SMTP_HOST ,
  port: process.env.SMTP_PORT,
  
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
   });
   
    transporter.sendMail({
    to,
    subject,
    text
   })
}