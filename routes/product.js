import express from "express"
import { create, list, photo, productById, read, remove, update } from "../controller/product"
import {userById} from "../controller/user"
import {isAdmin, isAuth, requireSignin} from "../controller/auth";
const UserRouter = require('../routes/user');

const router = express.Router()


router.post("/products/create",create)
router.get("/products", list)
router.get("/product/:productId", read)
router.delete("/product/:productId", remove)
router.param("productId", productById)
router.put("/product/:productId", update)
router.get("/product/photo/:productId", photo)
router.param('productId',productById)
UserRouter.param("userId", userById)
module.exports = router