const express=require('express');
//controllers
const cartControllers=require('../controllers/cart');

const router=express.Router();

router.post('/cart',cartControllers.postProductInCart);

module.exports=router;

