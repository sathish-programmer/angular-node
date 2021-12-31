const router = require("express").Router();
const registerData = require("../model/Register");
const bcrypt = require("bcryptjs");

// register user
router.post("/signup", async (req, res)=>{
    const checkEmailExist = await registerData.findOne({email: req.body.email});
    if(checkEmailExist) return res.status(400).send('Email already exits');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const saveUser = new registerData({
        "name": req.body.name,
        "email": req.body.email,
        "password": hashedPassword
    });
    try {
        let saveUserData = await saveUser.save();
        res.json({success: true, user: saveUser._id});
    } catch (error) {
        res.json(error);
    }
});

// login user
router.post('/login', async (req, res)=>{
    // check email 
    const userCheck = await registerData.findOne({email: req.body.email});
    if(!userCheck) return res.status(400).send('Email not found, check your email');

    // check password
    const checkPass = await bcrypt.compare(req.body.password, userCheck.password);
    if(!checkPass) return res.status(400).send('password invalid');

    try {
        res.json({success: true, message: "User Logged in!"});
    } catch (error) {
        res.json({success: false, message: "Cann't reach server, try again after some times!"});
    }
});

module.exports = router;

