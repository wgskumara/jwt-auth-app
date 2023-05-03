import Customer from '../model/CustomerModel.js';
import Token from '../model/Token.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js';
import { sendEmail } from '../utils/sendEmail.js';
import {  resetPassword } from '../utils/emailTemplate.js';


const register = async (req, res) => {
    try {
        const existingCustomer = await Customer.findOne({ email: req.body.email });
        if (existingCustomer) {
            return res.status(409).json({
                status: false,
                message: "Email already exists",
                data: undefined
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const customer = new Customer({ ...req.body, password: hashedPassword });
        const savedCustomer = await customer.save();

        return res.status(201).json({
            status: true,
            message: "Customer created successfully",
            data: savedCustomer
        });
    } catch (err) {
        console.error('Error creating customer:', err);
        return res.status(500).json({
            status: false,
            message: err.message,
            data: undefined
        });
    }
};

const login = async (req, res) => {
    try {
      const customer = await Customer.findOne({ email: req.body.email }).exec();
      if (!customer) {
        return res.status(401).json({
          status: false,
          message: 'User not found',
          data: undefined,
        });
      }
  
      const result = await new Promise((resolve, reject) => {
        bcrypt.compare(req.body.password, customer.password, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
  
      if (result) {
        const token = jwt.sign(
          {
            email: customer.email,
            customerId: customer._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '1h',
          }
        );
  
        const tokenDoc = await Token.findOneAndUpdate(
          { _customerId: customer._id, tokenType: 'login' },
          { token },
          { new: true, upsert: true }
        ).exec();
  
        return res.status(200).json({
          status: true,
          message: 'Auth successful',
          data: {
            token: tokenDoc.token,
            customer,
          },
        });
      } else {
        return res.status(401).json({
          status: true,
          message: 'Wrong password',
          data: undefined,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: false,
        message: 'Server Error',
        data: undefined,
      });
    }
  };

  const logout = async (req, res) => {
    try {
     
      await Token.findOneAndDelete({
        _customerId: req.customerId,
        tokenType: 'login',
      }).exec();
  
      return res.status(200).json({
        status: true,
        message: 'Logout successful',
        data: undefined,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: false,
        message: 'Server Error',
        data: undefined,
      });
    }
  };
  
  const authUser = async (req, res) => {
    const customerId = req.customerId;
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(401).json({
                status: false,
                message: 'User not found',
                data: undefined,
            });
        }
        return res.status(200).json({
            status: true,
            message: 'User found',
            data: customer,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: 'Error retrieving user',
            data: undefined,
        });
    }
};

const forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const emailTemplate = resetPassword(email , "redfvejrnvjehrnvhj");
        sendEmail(emailTemplate);
        res.status(200).json({
            status: true,
            message: "Email sent successfully",
            data: undefined
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: "Error sending email",
            data: undefined
        });
    }
};




  

export { register, login , logout , authUser, forgetPassword };
