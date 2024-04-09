const {DataTypes}= require('sequelize');
const CONNECTDB = require('../config/config');
const User = CONNECTDB.define('User', {
    user_id: {
        type: DataTypes.STRING, 
        allowNull: true,
       
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false
      }
  },{
   
    tableName: 'usertable',
    timestamps: false 
  }
  );

  module.exports=User;


  

    