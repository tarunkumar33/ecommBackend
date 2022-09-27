const express=require('express');
//controllers
const productControllers=require('../controllers/product');

const router=express.Router();

router.get('/product',productControllers.getProducts);

module.exports=router;

