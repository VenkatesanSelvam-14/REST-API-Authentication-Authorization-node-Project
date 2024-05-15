const {DataTypes}= require('sequelize');
const CONNECTDB = require('../config/config');


const pass = CONNECTDB.define('Pass', {
    username: {
        type: DataTypes.STRING, 
        allowNull:false
      },
      secretpassword: {
        type: DataTypes.STRING,
        // allowNull:false
      }
  },{
   
    tableName: 'authuser',
    timestamps: false 
  }
  );

//   (async () => {
//     await CONNECTDB.sync({ force: true }); 
//     console.log('All models were synchronized successfully.');
//   })();

  module.exports=pass;
