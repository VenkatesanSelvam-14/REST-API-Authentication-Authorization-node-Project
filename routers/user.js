const express = require('express');
const router = express.Router();

const user = require('../auth/auth');


var bodyParser = require('body-parser');  
 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({ extended: true }))


 router.get('/', async(req, res) => {
    const  users=await user.findAll();
    res.json(users);

});

 
router.get('/id', async (req, res) => {
    const { user_id } = req.body;
    const users = await user.findOne({ where: { user_id:user_id } });
    res.json(users);
});


router.post('/',async (req,res)=>{

    const { fullname } = req.body;

    try {
              
      
              const newUser = await user.create({
               
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



router.put('/', async(req, res) => {
  const { user_id ,fullname} = req.body;
   try{await user.update({fullname:fullname},{
          where:{
              user_id:user_id
          }
      }) 

      res.json('updated successfully');
    }

      catch(err){
        console.error(err);
      }
      
});

router.delete('/', async(req, res) => {
  const { user_id } = req.body;
  try{await user.destroy({
      where:{
          user_id:user_id
      }
  }) 

  res.json('deleted successfully');
}
  catch(err){
    console.error(err);
  }
});

module.exports = router;