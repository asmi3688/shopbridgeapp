const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  productImg: String
});
productSchema.pre("save", function preSave(next) {
  this.createdAt = Date.now();
  this.updatedAt = Date.now();
  next();
})
productSchema.pre(["update", "updateOne", "updateMany"], function preSave(next) {
  this.updatedAt = Date.now();
  next();
})
const ProductModel = mongoose.model('Product', productSchema)
module.exports = ProductModel