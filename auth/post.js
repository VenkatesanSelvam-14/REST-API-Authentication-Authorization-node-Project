const {DataTypes}=require('sequelize');
const CONNECTDB = require('../config/config');

const posts = CONNECTDB.define('posts', {
    
    post_id: {
        type: DataTypes.STRING, 
        allowNull: true,
       
      },

      user_id: {
        type: DataTypes.STRING, 
        allowNull: false,
        
      },
      posters: {
        type: DataTypes.STRING,
        allowNull: false
      }
   
  },{
    
    tableName: 'posttable',
    timestamps: false 
  });

  module.exports=posts;
