import express from "express"
import { isAdmin, isAuth, requireSignin } from "../controller/auth"
import { read, update, userById, userCheckEmail } from "../controller/user"
const UserRouter = express.Router()

UserRouter.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile,
    })
})
UserRouter.get("/user/check", userCheckEmail)
UserRouter.get("/user/:userId", requireSignin, isAuth, read)
UserRouter.put("/user/:userId", requireSignin, isAuth, update)

UserRouter.param("userId", userById)

module.exports = UserRouter