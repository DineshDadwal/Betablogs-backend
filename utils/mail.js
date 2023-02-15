const nodemailer = require('nodemailer');

const mailFunc= async(email, firstName, lastName)=>{
   let transporter = nodemailer.createTransport({
       service: 'gmail',
       type: "SMTP",   
       host: "smtp.gmail.com",
       port: 465, //587
       secure: true, // true for 465, false for other ports
       auth: {
         user: 'geekynerdofficial999@gmail.com', // generated ethereal user
         pass: 'lkpguewmvzoxjbye', // generated ethereal password
       //   pass: 'GEEKYNERD99', // generated ethereal password

       },
       tls:{
         rejectUnauthorized: false,
       }
     });
   
     // send mail with defined transport object
     let info = await transporter.sendMail({
       from: "geekynerdofficial999@gmail.com", // sender address
       to: `${email}`, // list of receivers
       subject: " click on this link to reset your password ", // Subject line
       text: `click on this link`, // plain text body
       html: `<h3>Click on this link to reset your password ⬇⬇⬇⬇⬇</h> <br>
       <a href="https://betablogs-308214.web.app/forgotPassword/reset-password">https://betablogs-308214.web.app/forgotPassword/reset-password</a>
                      `, // html body
     });
}

module.exports = { 
   mailFunc 
}