const mongoose = require('mongoose');
const user = mongoose.model('Usuario');

/*const dbURI = 'mongodb://127.0.0.1:27017/MyPlaces';
//https://cloud.mongodb.com/v2/641ae67a652e8a724efd6a8e#/clusters
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'));
// Define user model
const User = mongoose.model('User', userSchema);
// Middleware to parse request body
app.use(express.json());*/

//Metodos del API

// POST /api/register
const userCreate =  async (req, res) => {
  console.log(`email ${req.body.email}`);
  console.log(`password ${req.body.password}`);
  user.create({
    email:req.body.email,
    password:req.body.password
  })
  .then(user => {
    res
    .status(201)
    .json(user);
  })
  .catch (err => {
    res
    .status(400)
    .json(err);
  })
};
  
  
// PUT /api/register/:userId
const userUpdate = async (req, res) => {
  console.log(`id ${req.params.userId}`);
  console.log(`password ${req.body.password}`);
  if (!req.params.userId) {
    res.status(404).json({
      "message": "Not found, userId is required"
    });
    return;
  }
    //const user = await user.findById(req.params.userId).exec();
    user.findById(req.params.userId)
    .exec()
    .then(user => {
      if(!user){
        console.log('Usuario no encontrado');
        res.status(404).json({
          "message": "userId not found"
        });
        return;
      }else{
        user.password = req.body.password;
        console.log(`hemos cambiado la contraseña ${user.password}`);
        const savedUser =  user.save();
        res.status(200).json(savedUser);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        "message": "Internal server error"
      });
    });
};


// GET /api/login/:userId
const userLogin =  async (req, res) => {
  console.log(`id ${req.params.userId}`);
  if (!req.params.userId) {
    res.status(404).json({
      "message": "Not found, userId is required"
    });
    return;
  }
    user.findById(req.params.userId)
    .exec()
    .then(user => {
      if(!user){
        console.log('Usuario no encontrado');
        res.status(404).json({
          "message": "userId not found"
        });
        return;
      }else{
        console.log('Usuario  encontrado');
        res.status(200).json(user)
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        "message": "Internal server error"
      });
    });
};

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/


module.exports = {


  userCreate,
  userUpdate,
  userLogin
};
