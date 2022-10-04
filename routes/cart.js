const express=require('express');
//controllers
const cartControllers=require('../controllers/cart');

const router=express.Router();

router.post('/cart',cartControllers.postProductInCart);
router.get('/cart',cartControllers.getCartProducts);


module.exports=router;

