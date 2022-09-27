const Sequelize=require('sequelize');
const sequelize=require('../utils/database');

const products=sequelize.define('products',{
    id:{
        type:Sequelize.INTEGER,
        allowedNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    productName:Sequelize.STRING,
    imageUrl:Sequelize.STRING,
    price:Sequelize.DOUBLE
});

module.exports=products;