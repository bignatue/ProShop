import AsyncHandler from 'express-async-handler'
import Product from '../Models/ProductModel.js'

// @desc fetch all products
// @route GET /api/products
// @access public
const getProducts = AsyncHandler(async (req, res) => {
    const products = await Product.find({}) 
    res.json(products)
})

// @desc fetch single product
// @route GET /api/product/:id
// @access public
const getProductById = AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
})

export {getProducts, getProductById}