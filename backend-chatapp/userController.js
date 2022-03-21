
const jsonwebtoken = require('jsonwebtoken');
const User = require('./userModel');

const catchAsync = fn=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}


const getToken=(id)=>{
    return jsonwebtoken.sign({id:id},"my-new-password",{
        expiresIn:'30d'
    })

}

exports.signup = catchAsync(async (req,res,next)=>{
   
      const data  = await User.create(req.body)
      console.log(data)
      const token = getToken(data.id)
      res.status(201).json({
          status:"success",
          data:data,
          token:token
      })

  
  })

exports.login = catchAsync(async (req,res,next)=>{

        const {email,password} = req.body
        // check the email and the password is exist
        if(!email || !password){
            return res.status(200).json({
                status:"error",
                err:"please provide email and password!"
            })
        }
    
        // check if user is exist and oasword is coreact
        const user =await  User.findOne({email:email,password:password}).select('+password')
        // const correct = await user.correctPassword(password,user.password)
        console.log(user) 
        if(!user){
            
            return res.status(200).json({
                status:"error",
                err:"incorrect email or password!"
            })
        }
    
    
        //get the token
        const token = getToken(user._id);
    
        res.status(200).json({
            status:"succes",
            token:token,
            data:user
        })
  
  })
