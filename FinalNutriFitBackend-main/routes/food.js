const express=require("express");
const router=express.Router();


const {addFood,getUserFoodHistory} = require('../controllers/foodController');

router.post("/add",addFood);
router.get("/:userId",getUserFoodHistory);



module.exports=router