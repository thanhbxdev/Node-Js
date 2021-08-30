import express from "express"
import jwt from "jsonwebtoken"
import { requireSignin, signin, signout, signup } from "../controller/auth"
import { userSignupValidator } from "../validator"
const router = express.Router()

router.post("/signup", userSignupValidator, signup)
router.post("/signin", signin)
router.get("/signout", signout)
router.get("/profile", requireSignin, (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(user)
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
})

module.exports = router