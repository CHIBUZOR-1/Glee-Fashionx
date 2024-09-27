const bcrypt = require('bcryptjs');
const userModel = require('../Models/UserModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { setCookiesWithToken } = require('../Utilities/Auth');
const crypto = require('crypto');
const { sendMail } = require('../Utilities/Email');

const userRegisteration = async (req, res) => {
    try {

        const { firstname, lastname, phoneNumber, email, password } = req.body;
        if(!firstname) {
            return res.send({error: "name is required"});
        }
        if(!lastname) {
            return res.send({error: "lastname is required"});
        }
        if(!phoneNumber) {
            return res.send({error: "number is required"});
        }
        if(!email) {
            return res.send({error: "email is required"});
        }
        if(!password) {
            return res.send({error: "password is required"});
        }

        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({
                success: false,
                message: "Email already in use"
            })
        }
        // validating email format & password
        if(!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid Email Address"
            })
        }

        if(password.length < 6) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, `${salt}`);
        const newUser = await new userModel({
            firstname,
            lastname,
            phoneNumber,
            email,
            password: `${hashedPassword}`,
            verificationToken:crypto.randomBytes(32).toString('hex')
        }).save();
        const msg = `<p>Hello ${newUser.firstname}, Please verify your email address by clicking on the link below</p>
    <br>
    <a href="${process.env.ORIGIN}/${newUser._id}/verify-email/${newUser.verificationToken}">CLICK here</a>`;
    const sub = "Email Verification..";
        await sendMail(newUser.email, sub, msg)
        res.status(201).json({
            success: true,
            error: false,
            message: "Registered sucessfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "Registration Error"
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email) {
            return res.send({error: "email required"})
        }
        if(!password) {
            return res.send({error: "Input password"})
        }
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        } 

        if (!user.verified) {
            return res.json({ success: false, message: 'User not verified' });
        }

        const matchedPassword = await bcrypt.compare(password, user.password);
        if(!matchedPassword) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }
        
        setCookiesWithToken(user._id, res);
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                firstname: user.firstname,
                lastname: user.lastname, 
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber
            }
        });



    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Login Unsuccessful"
        })
        
    }
}

const logout = async(req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0});
        res.status(200).json({
            success: true,
            message: "Logged Out successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            success: false,
            message: "An error occured!"
        })
    }
}

const forgotPassword = async(req, res) => {
    try {
       const { email } = req.body;
        const user = await userModel.findOne({ email });
    
        if (!user) {
        return res.json({
            success: false,
            message: "Email Does Not Exist"
        });
        }
    
        const token = crypto.randomBytes(20).toString('hex');
        user.verificationToken = token;
    // user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
        await user.save();
        const topic = "Password Reset Request";
        const info = `<div><p>${user.firstname} ${user.lastname},</p> <p>An attempt was made to reset the password of your account.</p>
        <p>If this was you click on the link below:</p> <br> <a href="${process.env.ORIGIN}/reset-password/${user.verificationToken}">click here</a> <p>You can ignore the message if you didn't make the request.</p></div>`
        await sendMail(user.email, topic, info) 
        res.status(200).json({
            success: true,
            message: "Password Reset Link Sent"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "An error occurred!"
        })
    }

    
}

const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {  newPassword } = req.body;

        if(!newPassword) {
            return res.json({success: false, message: "Password required"});
        }
        const user = await userModel.findOne({verificationToken: token});
        if(!user) {
            return res.json({
                success: false,
                message: "Inavlid token"
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, `${salt}`);

        user.password = hashedPassword;
        user.verificationToken = null;
        await user.save()
        const topic = "Password Reset Successful";
        const info = `<div><p>Your password has been reset successfully.</p></div>`

        await sendMail(user.email, topic, info);
        res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error: true,
            message: "Something went wrong!"
        })
    }
}

const allUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({
            success: true,
            message: "Retrieved Users Successfully",
            data: users
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error retrieving Users list"
        })
    }
}

const updateUserRole = async (req, res) => {
    try {
        const { newRole } = req.body;
        if(!newRole) {
            return res.send({error: "role required"});
        }
        const roleUpdated = await userModel.findByIdAndUpdate(req.params.id, {role: newRole}, {new: true});
        if(roleUpdated) {
            res.json({
                success: true,
                message: "Role update successful"
            })
        } else {
            res.json({
                success: false,
                message: "Unable to update"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            error: true,
            message: "Error occured"
        })
    }
}



const deleteUser = async(req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if(user) {
          res.json({
            success: true,
            error: false,
            message: "deleted Successfully",
          });  
        } else {
            res.json({
              success: true,
              error: false,
              message: "delete Usuccessful"
            });
        } 
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message: "Error in Deleting file",
            error: true
        })
    }
}

const emailVerification = async(req, res) => {
    try {
        const { token } = req.params;
        const user = await userModel.findOne({verificationToken: token});
        if(!user) {
             return res.json({
                success: false,
                message: "invalid token!"
            })
        }
        user.verified = true;
        user.verificationToken = null;
        await user.save();
        const msg = `<p>Your Email Verification is Successful.</p>`;
        const sub = "Email Verified";
        await sendMail(user.email, sub, msg)
        res.status(200).json({
            success: true,
            message: "Verified Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}


const testController = (req, res) => {
    res.send('awesome');
}

module.exports = { userRegisteration, deleteUser, emailVerification, userLogin, logout, testController, allUsers, forgotPassword, resetPassword, updateUserRole };