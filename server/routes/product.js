const express = require("express")
const Product = require('../schema/product')
const router = express.Router();
// routes
router.get('/:id', async function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { id } = req.params
        const product = await Product.findOne({ _id: id })
        if (!product) {
            throw new Error("Data not found")
        }
        return res.send({ data: product }).status(200)
    } catch (error) {
        return res.status(400).send({ errorMsg: error.message })
    }
})

router.get('/', async function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const products = await Product.find({})
    return res.send({ data: products })
})

router.post('/', async function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { formData } = req.body
        const isProductExist = await Product.findOne({ name: formData.name })
        if (isProductExist) {
            throw new Error("Product Already Exist")
        }
        const productRes = await Product.create(formData)
        if (productRes) { return res.send('product added successfully!').status(200) }
    } catch (error) {
        return res.status(400).send({ errorMsg: error.message })
    }
})

router.put('/:id', async function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { id } = req.params
        const { formData } = req.body
        const isProductExist = await Product.findOne({ _id: id })
        if (!isProductExist) {
            throw new Error("Data not found")
        }
        const productRes = await Product.findOneAndUpdate({ _id: id }, formData)
        if (productRes) { return res.send('product added successfully!').status(200) }
    } catch (error) {
        return res.status(400).send({ errorMsg: error.message })
    }
})

router.delete('/', async function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    try {
        const { id } = req.query
        const isProductExist = await Product.findOne({ _id: id })
        if (!isProductExist) {
            throw new Error("Data not found")
        }
        const productRes = await Product.deleteOne({ _id: id })
        if (productRes) { return res.send('product deleted successfully!').status(200) }
    } catch (error) {
        return res.status(400).send({ errorMsg: error.message })
    }
})

module.exports = router