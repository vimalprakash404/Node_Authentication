const express = require('express')
const router = express.Router();
const jwt = require("jsonwebtoken")
const bodyPraser = require('body-parser')
const user = require('../models/users');
const emailValidator = require('deep-email-validator')
router.use(bodyPraser.json());


// Register User

router.post("/register",async (req, res)=> {
    const { email , password } = req.body;
    // email and password validation 
    if (!email  )
    {
        return res.status(400).json({message : "Email required"})
    }
    if (!password)
    {
        return res.status(400).json({message : "Password required"})
    }
    const valid= await isValidEmail(email)
    if (!valid)
    {
        return res.status(400).json({message : " email not valid"})
    }

    if (user.findByEmail(email))
    {
        return res.status(400).json({message : " Email already registered"})

    }
    
    const newUser = { email , password}
    user.create(newUser);



    return res.status(201).json({message:'User registered successfully'})

    


})
async function isValidEmail(email)
{
 return (await emailValidator.validate(email)).valid;
}

router.post('/login',(req , res ) => {
    const {email , password} =  req.body;
    const existingUser =  user.findByEmail(email);

    if (!existingUser || existingUser.password !== password)
    {
        return res.status(401).json({message : "Invalid credentials"});
    }

    const token = jwt.sign({email},'key',{expiresIn:'1h'});

    return res.json({token})
})
router.post.status

module.exports = router;