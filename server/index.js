const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const mongoose = require('mongoose');
const Product = require("./schema/product")
const routeHandler = require("./routes")
mongoose.connect('mongodb://mongo:27017/shopbridgeDB',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 120000,
    socketTimeoutMS: 720000
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.send('Welcome to ShopBridge!')
});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to Mongoose")
});

app.use(cors())
app.use(express.json())
app.get('/createTestData', async (req, res) => {
    const productData = {
        name: "Guitar1",
        description: "It is a guitar1",
        price: 12500,
        productImage: "https://guitar1.com"
    }
    const product = await Product.create(productData)
    if (product) { return res.send('product added successfully!') }
})
app.get('/testData', async (req, res) => {
    const products = await Product.findOne({})
    return res.send({ data: products })
})
process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error)

});
routeHandler.init(app)
app.listen(4000, () => console.log('Server ready'))