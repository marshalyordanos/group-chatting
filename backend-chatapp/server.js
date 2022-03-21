const app = require('./app')
const mongoose = require('mongoose')

mongoose.connect(
    "mongodb://localhost:27017/miniGroupchat",{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false
    }
).then(()=>{
    console.log("Db connection successful! ..........")
})

app.listen(8000,()=>{
    console.log("the server is runnong..........")
})