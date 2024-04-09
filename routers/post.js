const express = require('express');
const router = express.Router();
const {op}= require('sequelize');

const posts = require('../auth/post');

var bodyParser = require('body-parser');  
 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({ extended: true }))


 router.get('/', async(req, res) => {
    const  users=await posts.findAll();
    res.json(users);
});

 
router.get('/id', async (req, res) => {
    const { user_id } = req.body;
    const users = await posts.findOne({ where: {[Op.or]: [{ user_id: user_id }, { post_id: user_id}]  }});
    res.json(users);
});


router.post('/',async (req,res)=>{

    const { fullname } = req.body;

    try {
              
              const newUser = await posts.create({
                
                fullname
              });

              if ( !fullname) {
                return res.status(400).json({ error: 'user_id and fullname are required fields' });
              }

          res.send(newUser);
              console.log('User created successfully:', newUser.toJSON());
            } catch (error) {
              console.error('Error inserting data:', error);
            } finally {
             
              // await Sequelize.close();
            }
   
});


    

router.put('/id', async(req, res) => {
    const { post_id ,fullname} = req.body;
    const update = await posts.update({posters:fullname},{
            where:{
                post_id:post_id
            }
        }) 
  
        res.json('updated successfully');
       
  });
  
router.delete('/id', async(req, res) => {
    const { post_id } = req.body;
    const deleted = await posts.destroy({
        where:{
            post_id:post_id
        }
    }) 

    res.json(deleted);
});

module.exports = router;