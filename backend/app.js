require('dotenv').config();
const express = require('express');
const app = express();
const morgan= require('morgan');
const dBconnect = require("./config/dBconnect");
const authRouter = require("./routers/auth.router")
const routerProduct  = require('./routers/product.router')
const routerCategory = require('./routers/category.router')
const routerCart = require('./routers/cart.router')
const routerOrder= require('./routers/order.router')
//// middlwears ///
 app.use(morgan('combined'));
 app.use(express.json());
 app.use(express.urlencoded({extended : true }))
////// app server
/// connect to server
dBconnect();
app.use("/api/auth" , authRouter)
app.use('/api/product', routerProduct)
app.use('/api/category', routerCategory)
app.use('/api/cart', routerCart)
app.use('/api/order', routerOrder)
app.get("/",(req ,res)=>{
    res.send("e-commerce working ")
})
app.post("/test", (req, res) => {
  console.log("Test route hit");
  res.json({ message: "Test works" });
});
const PORT = process.env.PORT || 5000 ;
app.listen(PORT , ()=>console.log(`server running in port ${PORT}`))
