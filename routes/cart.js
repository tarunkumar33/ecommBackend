const express=require('express');
//controllers
const cartControllers=require('../controllers/cart');
const orderControllers=require('../controllers/order');

const router=express.Router();

router.post('/cart',cartControllers.postProductInCart);
router.get('/cart',cartControllers.getCartProducts);
router.get('/create-order',orderControllers.createOrder);


module.exports=router;

