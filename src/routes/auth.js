const router= require('express').Router();
const User = require("../../models/user");
const nodemailer = require('nodemailer')

// const bcrypt= require('bcrypt');



router.get('/register' , (req,res)=>{

    res.render('partials/register')
});

router.post('/register', async(req,res)=>{
     
   
   
    //gensalt will create 10 words of each word. Bcrypt will encrypt it
//    const salt= await bcrypt.genSalt(10);
//    const hashpassword= await bcrypt.hash(req.body.password, salt);
   const newUser = new User({ 
 
       username: req.body.username, 
 
       email: req.body.email,

       password:req.body.password,  


     

   });

   const mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'amilzak42@gmail.com',
        pass: 'yxeeoklsghhcdqsq', //generated ethereal password
    }

});

const info= await mail.sendMail({
    from: 'amilzak42@gmail.com',
    to: req.body.email,
    text: "testing", // plain text body
    html: req.body.username,

    
});



   
    try {
      
        const user = await newUser.save();
        res.redirect('/')
        
        
    } 
    catch (err) {
        res.status(500).json(err);
    }

}); 


router.get('/login' , (req,res)=>{

    res.render('partials/login')
});

router.post('/login', async(req,res)=>{


    try {

        const email= await User.findOne({email:req.body.email})
        if(!email){
            res.status(400).json("wrong credentials")
        }

        const pass= await User.findOne({pass:req.body.pass})
        if(!pass){
            res.status(400).json("wrong credentials")  
        }
        
        res.redirect('/') 
    } catch (err) {

        res.status(500).json(err);
        
    }

})
 
module.exports = router