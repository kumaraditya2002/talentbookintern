const { signup, signin, signout }  = require('../controllers/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');

const {adminMiddleware , requireSignin} = require('../middleware/index');
const express = require('express');
const multer = require('multer');
const { nanoid } = require('nanoid');
const path = require('path');
const {fill, forms} = require('../controllers/form');

//Storage for File storing
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, nanoid(8) + '-' + file.originalname)
    }
});

const upload = multer({ storage });
const router = express.Router();
router.get('/',(req,res)=>{
  res.render("index")
})
router.get('/signup',(req,res)=>{
  res.render("signup")
})
router.get('/feedbackform',(req,res)=>{
  res.render("surveyForm");
})

router.post('/signup',validateSignupRequest,isRequestValidated, signup);
router.post('/signin',validateSigninRequest,isRequestValidated, signin);
router.get('/signout', signout);
router.get('/allforms',forms);
router.post('/fillform',requireSignin,fill);

module.exports = router;