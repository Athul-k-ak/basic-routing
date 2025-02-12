const express = require('express')
const path = require('path')
const productRouter = require('./routes/productsRouter')

const app = express()
app.use(express.json())
app.use('/products',productRouter)
app.get('/',(req,res)=>{
    
    res.sendFile(path.join(__dirname,"/index.html"))

})
app.listen(3000,()=>{
    
    console.log("Server started...")
})