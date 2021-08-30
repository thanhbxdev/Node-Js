import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 32,
        required: true,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
    description: {
        type: String,
        maxLength: 2000,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    price_sale: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        type: Boolean,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })
module.exports = mongoose.model("Product", productSchema)