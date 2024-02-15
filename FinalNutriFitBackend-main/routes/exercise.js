const express=require("express");
const router=express.Router();


const {addExercise} = require('../controllers/exerciseController');

router.post("/add",addExercise);



module.exports=router