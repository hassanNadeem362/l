const express=require("express");

const foodRoutes=require("../routes/food")
const authRoutes=require("../routes/auth")
const exerciseRoutes=require("../routes/exercise")
const userRoutes=require("../routes/user")
const nutRoutes=require("../routes/nutritionist");
const referrerPolicyMiddleware = require("../referrerPolicyMiddleware");

const router=express.Router();
router.use(referrerPolicyMiddleware);

router.use("/food",foodRoutes)
router.use("/auth",authRoutes)
router.use("/exercise",exerciseRoutes)

router.use("/user",userRoutes)
router.use("/nutritionist",nutRoutes);
module.exports = router
