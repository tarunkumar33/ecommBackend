const Sequelize=require('sequelize');
const sequelize=require('../utils/database');

const Order=sequelize.define('orders',{
    id:{
        type:Sequelize.INTEGER,
        allowedNull:false,
        autoIncrement:true,
        primaryKey:true
    }
});
module.exports=Order;