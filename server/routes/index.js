const express = require("express")
const productRouter = require("./product")

module.exports = {
    init: app => {
        app.use("/product", productRouter)
    }
}

exports.productRouter = productRouter