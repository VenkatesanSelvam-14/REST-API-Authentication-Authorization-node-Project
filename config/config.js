const {Sequelize}=require('sequelize');
const env=require('dotenv');
env.config();

const dbconnect = new Sequelize(process.env.DATABASE_NAME,process.env.USER_NAME,process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
  });

  async function fun(){
    try{
        await dbconnect.authenticate();
        console.log('ok');
    }
    catch(err){
        console.log(err);
    }
    }

    fun();




  

    module.exports=dbconnect;
   