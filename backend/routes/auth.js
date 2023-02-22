const express = require('express')
const User= require("../models/User")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Hitisagoodb$oy';

// ROUTE:1, Create a User using: POST "/api/auth/createuser". No login required

router.post("/createuser",[
    body('name',"enter a valid name").isLength({ min: 2 }),
    body('email', "enter a valid email").isEmail(),
    body('password',"password must be contain atleast 5 characters").isLength({ min: 5 })
],

async (req,res)=>{
     let isSuccess = false;

   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ isSuccess,errors: errors.array() });
    }


   try {
    
    // check whether the user with the same email exist already
    let user =await User.findOne({email:req.body.email})
    if(user){
      isSuccess=false;
        return res.status(400).json({isSuccess,error:"sorry a user with the same email already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //create a new user
     user= await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      // res.json(user)
      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      isSuccess=true;
      res.json({isSuccess,authtoken})
    }
    

      catch (error) {
         console.error(error.message)
         res.status(500).send("some error occured")
      }
   
})

//ROUTE:2, Authenticate a User using: POST "/api/auth/login". No login required
router.post("/login",[
    body('email',"enter a valid email").isEmail(),
    body('password',"password cant be blank").exists(),
],async (req, res) => {
 let isSuccess=false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      isSuccess=false;
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      isSuccess=false;
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    isSuccess=true;
    res.json({isSuccess,authtoken})

  }
   catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }





})

//ROUTE 3, Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


module.exports= router;