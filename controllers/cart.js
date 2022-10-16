const Product=require('../models/product');

exports.postProductInCart=(req,res,next)=>{
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(res=>console.log(res))
    .catch(err => console.log(err));
}


exports.getCartProducts=(req,res,next)=>{
  // req.user
  // .getCart()
  // .then(cart=>{
  //   return cart
  //     .getProducts()
  //     .then(result=>res.json(result))
  //     .catch(err => console.log(err));
  // })
  // .catch(err => console.log(err));

  async function getCartProductsAsync(){
    try{
      let cart=await req.user.getCart();
      let products=await cart.getProducts();
      // console.log("hi.....................",cart);
      res.json(products);
    }
    catch(err){
      console.log(err);
    }
  }
  getCartProductsAsync();
}