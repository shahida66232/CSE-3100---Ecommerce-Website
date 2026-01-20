import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const generateToken=(userId)=>{
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_IN}
    )
}

export const register=async (req,res)=>{
    try{
        const {username,email,age,password,role}=req.body

        const alreadyUser=await User.findOne({
            $or:[{email:email.toLowerCase()},{username}]
        })

        if(alreadyUser)
        {
            return res.status(409).json({
                success:false,
                message:alreadyUser.email===email?"Email already registered":"Username already taken"
            })
        }

        const user=await User.create({
            username,
            email,
            age,
            password,
            role:role||"user"
        })

        const token=generateToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:7*24*60*60*1000
        })

        res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:{
                user:{
                    id:user._id,
                    username:user.username,
                    email:user.email,
                    age:user.age,
                    role:user.role
                },
                token
            }
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server error",
            error: error.message
        })
    }
}

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier }
      ]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          age:user.age,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};