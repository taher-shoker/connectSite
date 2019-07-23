const express = require('express')
const router =express.Router()
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const User= require('../../models/User')

// @route   Post api/auth
// @desc    Test users 
// @access  private
router.get('/',auth,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   Post api/auth
// @desc    authenticate  users & Get token
// @access  Public
router.post('/', [
   
    // check email
    check('email', 'Please Include A valid Email').isEmail(),
    // password must be at least 5 chars long
    check('password', 'password is required').exists()
  ], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password } = req.body
    try {
      // check if user exists in database 
      let user = await User.findOne({ email })
      if (!user) {
        
       return res.status(400).json({ errors: [{ msg: 'Invalid Email' }] })
      }
      
      // match password with user.password
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Password' }] })
      }
      // set payload
      const payload = {
        user:{
          id:user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn:360000},
        (err,token)=>{
          if(err) throw err;
          res.json({token})
        }
        )
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server errors');
    }
  
  })
  

module.exports = router