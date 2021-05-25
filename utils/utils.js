let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
var otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
// var { SMTPClient } = require('emailjs') ;
const encryptPassword = async (hashedPassword) => {
   
   return new Promise ((resolve,reject)=>{
      
      bcrypt.hash(hashedPassword, 10, (err,hash)=> {
         if(err){
            reject(err)
         }
         else{
            resolve(hash)
         }
      });
   })
}


const comparePassword = async (password, hash) => {
   return new Promise((resolve, reject) => {
       bcrypt.compare(password, hash, (err, res) => {
           if (err) {
               reject(err)
           }
           else {
               resolve(res)
           }
       })
   })
}

const generateJwt = async (id) => {
   return new Promise((resolve,reject)=>{
       let expiry = new Date();
       expiry.setDate(expiry.getDate() + 7);
       let token = jwt.sign({
           _id: id,
           exp: parseInt(expiry.getTime())
       }, "Secret")
       resolve(token)
       reject(err)
   })
}

const verifyJwt = () => {
   try {
       const token = jwt.verify(token, "Secret")
       if (token) {
           return true;
       }
       else
           throw new Error;
   }
   catch{
       return false;
   }
}

const mailFunc= async(email, firstName, lastName)=>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        type: "SMTP",
        host: "smtp.ethereal.email",
        // port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'geekynerdofficial999@gmail.com', // generated ethereal user
          pass: 'GEEKYNERD99', // generated ethereal password
        //   pass: 'GEEKYNERD99', // generated ethereal password

        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: "geekynerdofficial999@gmail.com", // sender address
        to: `${email}`, // list of receivers
        subject: "Hello Confirm Your Email for Beta Blogs ✔", // Subject line
        text: `Hey ${firstName, lastName}`, // plain text body
        html: `<b>Hello Welcome to Beta Blogs Community</b>
                       <h3>Here is your OTP-: <b>${otp}</b><h3> 
                       <p>Enter your Otp within 5 min</p>`, // html body
      });
}

// const mailFunc= async(email, firstName, lastName)=>{
// const client = new SMTPClient({
// 	user: 'geekynerdofficial999@gmail.com',
// 	password: 'GEEKYNERD99',
// 	host: 'smtp.your-email.com',
// 	ssl: true,
// });

// const message =  {
// 	text: 'Hello Confirm Your Email for Beta Blogs ✔',
// 	from: 'geekynerdofficial999@gmail.com',
// 	to: `geekynerdofficial999@gmail.com`,
// 	// cc: 'else <else@your-email.com>',
// 	subject: 'Hello Confirm Your Email for Beta Blogs ✔',
// 	attachment: [
// 		{ data: `<html><b>Hello ${firstName, lastName} Welcome to Beta Blogs Community</b>
//                               <h6>Here is your OTP-: <b>${otp}</b><h6> 
//                                <p>Enter your Otp within 5 min</p></html>`, alternative: true },
// 		{ path: 'path/to/file.zip', type: 'application/zip', name: 'renamed.zip' },
// 	],
// };

// send the message and get a callback with an error or details of the message that was sent
// client.send(message, function (err, message) {
// 	console.log(err || message);
// });
// }
   const otp =  otpGenerator.generate(6, { upperCase: false, specialChars: false });

const compare = async (otp)=>{
    return new Promise((resolve,reject)=>{
        compare(otp, (err, res) => {
            if (otp == otpGenerator) {
                resolve(res)
            }
            else {
                reject(err)
            }
    })
    }
    )
}
module.exports = { 
   encryptPassword, comparePassword, generateJwt, verifyJwt,otp,mailFunc 
}