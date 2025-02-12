const express = require('express')
const router = express.Router()
const products = require('../products')

router.get('/',(req,res)=>{
    // res.send("inside Products")
    try{
        res.status(200).json(products)
    }catch (error) {
        res.status(404).json({error:"products not found"})
    }
})

router.get('/:id',(req,res)=>{
    try{
        const productID = parseInt(req.params.id)
        const product = products.find(prod =>prod.id===productID)
        if(!product){
            res.status(404).json({error:"products not found"})
        }
        res.status(200).json(product)

    }catch(error){
        res.status(404).json({error:error})
    }
})

router.post('/',(req,res)=>{
    try{
        if(!req.body) res.status(400).json({message:"Name and price are required"})
            const {name,price} = req.body
        if(!name || !price) res.status(400).json({message:"Name and price are required"})

            const newProduct ={
                id:products.length?products[products.length-1].id+1:1,
                name:name,
                price:price
            }
            products.push(newProduct)
            res.status(201).json({message:"Product added succesfully",product:newProduct})
    }catch (error){
        res.status(404).json({error:error})
    }
})

router.patch('/:id',(req,res)=>{
    try{
        const productID = parseInt(req.params.id)
        const product = products.find(prod => prod.id===productID)
        if(!product){
            res.status(404).json({error:"Product not available"})
        }
        const {name,price}=req.body
        product.price = price
        product.name=name
        res.status(200).json(product)
    }catch (error) {
        res.status(404).json({error:error})
    }
})

module.exports = router