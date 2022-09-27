const productsModel=require('../models/product');

exports.getProducts=(req,res,next)=>{
    productsModel.findAll()
    .then(result=>res.json(result))
    .catch(err=>console.log(err));
}