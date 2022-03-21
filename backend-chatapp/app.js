const express = require('express');
const Cors = require('cors')
const userRouter = require('./userRouter');
const Chat = require('./chatmodel');

const app = express();
app.use(express.json());
app.use(Cors())


const catchAsync = fn=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}

app.get('/chats',catchAsync(async(req,res,next)=>{
    let query =   Chat.find()

    query = query.sort('-createdAt')
    const allChats = await query;

       res.status(200).json({
          status:'success',
          chat:allChats
       })
   }))
app.post('/chats',catchAsync(async(req,res,next)=>{
const chat =  await Chat.create(req.body)
    res.status(200).json({
        status:'success',
        chat:chat
    })
}))
app.use('/users',userRouter)


app.use('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:"fail",
    //     message:"page not found"
    // })
    const err  =  new Error("Can't find the page")
    err.statusCode = 200;
    err.status = "fail"
    next(err)
})

app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 200
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
})

module.exports = app;