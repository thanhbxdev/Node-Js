import formidable from "formidable"
import fs from "fs"
import _ from "lodash"
import Product from "../models/product"
import {Types} from "mongoose";

export const create = (req, res) => {
    console.log('User: ', req.user)
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Thêm sản phẩm không thành công !",
            })
        }
        const {name, description, price, category, price_sale, quantity} = fields
        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ thông tin !",
            })
        }
        if (price < price_sale) {
            return res.status(400).json({
                error: "Nhập giá Sale Nhỏ Hơn Giá Gốc !",
            })
        }
        let product = new Product(fields)
        if (files.photo) {
            if (files.photo.size > 100000000) {
                res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 1 MB",
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Không thêm được sản phẩm",
                })
            }
            res.json(data)
        })
    })
}
export const list = (req, res) => {
    const {categoryId} = req.query
    let match = {}
    if (categoryId){
        match={...match,category: Types.ObjectId(categoryId) }
    }
    Product.find(match, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Khong tim thay san pham",
            })
        }
        res.json(data)
    })
}
export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: "Không tìm thấy sản phẩm",
            })
        }
        req.product = product
        next()
    })
}
export const remove = (req, res) => {
    let product = req.product
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm",
            })
        }
        res.json({
            product: deletedProduct,
            message: "Sản phẩm đã được xóa thành công",
        })
    })
}
export const read = (req, res) => {
    return res.json(req.product)
}
export const update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Sửa sản phẩm không thành công !",
            })
        }
        const {name, description, price} = fields
        if (!name || !description || !price) {
            return res.status(400).json({
                error: "Bạn cần nhập đầy đủ thông tin !",
            })
        }
        let product = req.product
        product = _.assignIn(product, fields)
        if (files.photo) {
            if (files.photo.size > 100000) {
                res.status(400).json({
                    error: "Bạn nên upload ảnh dưới 1 MB",
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.path
        }
        product.save((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Không sửa được sản phẩm",
                })
            }
            res.json(data)
        })
    })
}
export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}
