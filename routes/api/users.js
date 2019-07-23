const express = require('express');
const router = express.Router();
const gravater = require('gravatar')
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

// @route   Post api/users
// @desc    Register users 
// @access  Public
router.post('/', [
  check('name', 'Name Is Required')
    .not()
    .isEmpty(),
  // email must be an email
  check('email', 'Please Include A valid Email').isEmail(),
  // password must be at least 5 chars long
  check('password', 'Please  enter password with 6 or more characters').isLength({ min: 5 })
], async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body
  try {
    // check if user exists in database 
    let user = await User.findOne({ email })
    if (user) {
      res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }
    // get user's avater
    const avater =gravater.url(email,{
      s:'200',
      r:'pg',
      d:'mm'

    })

    user = new User({
      name,
      email,
      password,
      avater
    })
    // Encrypt password

    const salt =await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt)
    await user.save()
    // set payload
    const payload = {
      user:{
        id:user.id
      }
    }
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {expiresIn:36000},
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

module.exports = router;
