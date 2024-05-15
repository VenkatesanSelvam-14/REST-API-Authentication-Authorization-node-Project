const {DataTypes}=require('sequelize');
const CONNECTDB = require('../config/config');

const posts = CONNECTDB.define('posts', {
    
    post_id: {
        type: DataTypes.STRING, 
        allowNull: true,
        primaryKey: true
       
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

//   (async () => {
//     await CONNECTDB.sync({ force: true }); 
//     console.log('All models were synchronized successfully.');
//   })();

  module.exports=posts;
