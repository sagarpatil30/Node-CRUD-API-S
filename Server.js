const express = require('express')
//In Node.js, require is a special function that allows you to 
//include external modules in your application. 
const app = express()

require('dotenv').config();

const Product = require('./models/productModel')
const mongoose = require('mongoose');
//to bulid the connection to mongoDB


app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.send('hello node API!!!!')
})

//TO GET ALL PRODUCTS FROM DB
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//GETTING SINGLE PRODUCT BY ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.find({ id });
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Create
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//UPADTE A PRODUCT
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //if condtion is used if the product isnt present in DB
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete or Remove
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('')
    .then(() => {
        console.log('Connected to Mongo-DB');
        app.listen(3002, () => {
            console.log('Node api is running!!');
        })
    }).catch((error) => {
        console.log(error);
    })


