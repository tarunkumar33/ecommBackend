const productsModel=require('../models/product');

exports.createOrder=(req,res,next)=>{
    async function createOrderAsync(){
        try{
            let cart=await req.user.getCart();
            let products=await cart.getProducts();
            let order=await req.user.createOrder();
            order.addProducts(
                products.map(product=>{
                    product.orderItem={quantity:product.cartItem.quantity};
                    return product;
                })
            );
            await cart.setProducts(null);
            res.json(order);
        }
        catch(err){
            console.log(err);
        }
    }
    createOrderAsync();
}

exports.getOrders=(req,res,next)=>{
    async function getOrdersAsync(){
        try{
            //eagar loading joins
            //for each order order.getProducts()
            //include product model
            let orders=await req.user.getOrders({include:productsModel});

            console.log('hi..............',orders);
            res.json(orders);
        }
        catch(err){
            console.log(err);
        }
    }
    getOrdersAsync();
}