const Otp = require('../models/Otp.js');
const randomstring = require('randomstring');
const sendEmail = require('../nodeMailer.js');
const userDetail = require("../models/User");

function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

exports.sendOTP = async (req, res, next) => {
    try {
        const { email } = req.query;
        // const data = await User.findOne({ email: email });
        // const name = data.name;
        const otp = generateOTP();
        const newOTP = new Otp({ email, otp });
        await newOTP.save();

        await sendEmail({
            to: email,
            subject: 'Your OTP to Verify Email',
            message: `<html>
       <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 10px; padding: 20px;">
        
          <p style="color: #555555; font-size: 16px;margin-top: 10%;">
            Hi, 
          </p>
          <p style="color: #555555; font-size: 16px;">
            You have requested to reset your password.
          </p>
          <h2 style="color: #333333;text-align: center;margin-top: 5%;">Your One-Time Password (OTP):</h2>
            <p style="text-align: center; font-size: 24px; color: #000000; font-weight: bold; margin: 15px 0;">
            <span style="width: fit-content;padding: 10px;background-color: #54ffde;border-radius: 7px;">${otp}</span>
            </p>
          <p style="color: #555555; font-size: 16px;margin-top: 7%;">
            Please use this OTP to complete your verification process. This OTP is valid for the next 10 minutes.
          </p>
          <p style="color: #555555; font-size: 16px;  ">
            If you did not request this OTP, please ignore this email or contact our support team.
          </p>
          <p style="color: #555555; font-size: 16px;">
            Regards,<br>
              MetaCards,
          </p>
          </div>
        </div>
      </body>
    </html>`,
        });

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
exports.verifyFirstTimeOTP = async (req, res, next) => {
  try {
      const {data,otp}=req.body;
      const email=data.email;
      const existingOTP = await Otp.findOneAndDelete({ email, otp });
      
      // const name = data.name;

      if (existingOTP) {
      
          const newUser=new userDetail(data);
          await newUser.save();
          res.status(200).json({ success: true, message: 'Register Succesfully' });
      } else {
          res.status(400).json({ success: false, error: 'Invalid OTP' });
      }
  } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
exports.verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.query;
        const existingOTP = await Otp.findOneAndDelete({ email, otp });
        // const data = await User.findOne({ email });
        // const name = data.name;

        if (existingOTP) {
            await sendEmail({
                to: email,
                subject: 'Password Reset Successful',
                message: `<html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 10px; padding: 20px;">
          <img src="https://iiitu-website.onrender.com/uploads/static/1logo-una-full.png" style="width: 100%;" />
          <p style="color: #555555; font-size: 16px;margin-top: 10%;">
            Hi, 
          </p>
          <p style="color: #555555; font-size: 16px;">
            Your password has been reset successfully.
          </p>
          <p style="color: #555555; font-size: 16px;">
            Regards,<br>
              MetaCard
          </p>
        </div>
      </body>
    </html>`,
            });
            res.status(200).json({ success: true, message: 'OTP verification successful' });
        } else {
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};