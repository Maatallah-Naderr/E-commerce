const mongoose = require('mongoose');
const dBconnect = async()=>{
 try{
    await mongoose.connect(process.env.URL_MONGO)
    console.log("db connected with success")

 }catch(err){
    console.log("network connection " , err)

 }
}
module.exports= dBconnect;