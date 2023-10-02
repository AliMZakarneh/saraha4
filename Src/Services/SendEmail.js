import nodemailer from "nodemailer";

async function SendEmail(to,subject,html){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: process.env.SENDEMAIL,
          pass: process.env.SENDPASSWORD
        },
      });
      
        const info = await transporter.sendMail({
          from: `infinity light ${process.env.SENDEMAIL}`, 
          to, 
          subject,
          html, 
        });
}

export default SendEmail;

