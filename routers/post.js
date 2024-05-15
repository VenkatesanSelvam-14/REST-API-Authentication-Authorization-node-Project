const express = require('express');
const router = express.Router();
const {op}= require('sequelize');

const posts = require('../auth/post');


const user = require('../auth/auth');

var bodyParser = require('body-parser');  
 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({ extended: true }))


 router.get('/', async(req, res) => {
    const  users=await posts.findAll();
    res.json(users);
});


 
router.get('/id', async (req, res) => {
    const { user_id } = req.body;



    str=user_id.substring(0,8);
    console.log(str);


    try{
    if(str=="user_id_"){
      
      
      user.hasMany(posts,{foreignKey:"user_id"});
      posts.belongsTo(user,{foreignKey:"user_id"});


      const result= await posts.findAll({where:{user_id : user_id},include: [{
        model: user,
        attributes: ['fullname'],
        required: true
      }]})
      
      res.json(result)
      
      
    }
    
    else if(str=="post_id_")
    {
    const postId = await posts.findOne({ where: {post_id:user_id}});
    res.json(postId);
    }

    else{
      res.json("invalid id");
    }
    }

    catch (err){
      console.error('Error inserting data:', err);
    }
});


router.post('/',async (req,res)=>{

    const { user_id,posters } = req.body;

    const {count , row}=await user.findAndCountAll({where: {user_id:user_id}});

    if (count>0)
    {
      try {
              
        const newUser = await posts.create({
          // post_id,
          user_id,
          posters
        });

        if (!user_id||!posters) {
          return res.status(400).json({ error: 'user_id and fullname are required fields' });
        }

    res.send(newUser);
        console.log('User created successfully:', newUser.toJSON());
      } catch (error) {
        console.error('Error inserting data:', error);
      } finally {
       
        // await Sequelize.close();
      }
    }

    else{
      res.json("user id doesnot exists")
    }
   
});


    

router.put('/', async(req, res) => {
    const { post_id ,user_id,fullname} = req.body;
    try{
     await posts.update({user_id:user_id,posters:fullname},{
            where:{
                post_id:post_id
            }
        }) 
  
        res.json('updated successfully');
      }
      catch (err){
        console.error(err);
      }
       
  });
  
router.delete('/', async(req, res) => {
    const { post_id } = req.body;
     try{ await posts.destroy({
        where:{
            post_id:post_id
        }
    }) 

    res.json(deleted);
  }
  catch(err){
    console.error(err);
  }
});

module.exports = router;
