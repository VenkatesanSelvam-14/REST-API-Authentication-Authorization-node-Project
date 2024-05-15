const express = require('express');
const router = express.Router();
const {op}= require('sequelize');

const auth = require('../auth/user');

const posts = require('../auth/post');

const user = require('../auth/auth');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

app.use(express.json());
var bodyParser = require('body-parser');  
 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({ extended: true }))


 router.get('/', async(req, res) => {
    const  users=await auth.findAll();
    res.json(users);
});


router.post('/',async (req,res)=>{

    const username  = req.body.username;
    const password  = req.body.secretpassword;

    try {

        // !username ||
        if ( !password ) {
            return res.status(400).json({ error: 'username and password are required fields' });
          }


              const secretpassword=await bcrypt.hash(password,10)
            //   const password=await bcrypt.compare(password, this.hashpassword);
          
              const newUser = await auth.create({
               
                username , secretpassword
              });


          res.send(newUser);
              console.log('User created successfully:', newUser.toJSON());
            } catch (error) {
              console.error('Error inserting data:', error);
            } finally {
             
              // await Sequelize.close();
            }
   
});

router.get('/posts',authenticatetoken, async (req, res) => {
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


router.post('/login',async (req,res)=>{
    const Username = req.body.username;
    const password = req.body.secretpassword;

    

    try {
        const user_name =  await auth.findAll({
            where: {
                username: Username
            }
        });


        if(user_name.length===0)
        {
           res.send("user doesnot exists")
        }
        

        const result= user_name.find(async(val)=>{
          
       
           
        const answer= await bcrypt.compare(password,val.secretpassword)
          
              

                   return answer;
                  
            
            });
         
            
            if(result)
            {
              // res.send(result) ;
//, { expiresIn: '1h' }
              const UserName={name:Username} ;
              const accesstoken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN)
              res.json({ accesstoken:accesstoken })

            }
            else{
              res.send("password wrong");  
                

            }
            
            
      
        }
        
       
        
        catch (error) {
              console.error('Error searching  data:', error);
            } finally {
             
              // await Sequelize.close();
            }

           
});

function authenticatetoken(req,res,next){
  const autheader=req.header['authorization'];
  const token=autheader&&autheader.split(' ')[1]

  if(token==null) return sendStatus(401);

  jwt.verify(token,process.env.ACCESS_TOKEN,(err,User)=>{
    if(err) return sendStatus(403);

    req.User=User;
    next();
  })
}

module.exports = router;