//express,cors,bodyparser
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
//routes
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');
//DB
const sequelize=require('./utils/database');

//models
const User=require('./models/user');
const Cart=require('./models/cart');
const Product=require('./models/product');
const CartItem=require('./models/cart-item');

const app=express();
app.use(cors());
//parsing json and form data
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.use((req, res, next) => {
    User.findByPk(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
app.use(productRoutes);
app.use(cartRoutes);

//sync models with DB
// sequelize.sync()
// .then(res=>{
//     console.log('synced models with DB successfully');
//     app.listen(3000);
// })
// .catch(err=>console.log(err));

//associations
//1-1
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

// orders association
Order.belongsTo(User);
User.hasMany(Order);

// Order.belongsToMany(CartItem,{through})

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });