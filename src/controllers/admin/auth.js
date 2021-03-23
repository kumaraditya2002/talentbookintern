const Admin = require('../../models/admin');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.signup = (req, res) => {
  Admin.findOne({ email: req.body.email }).exec((error, admin) => {
    if(admin)
      return res.json({
        message: "User already registered",
      });

      
    Admin.estimatedDocumentCount(async (err, count) => {
      if (err) return res.json({ error });
      let role = "admin";
      if (count === 0) {
        role = "super-admin";
      }
      const { Name, email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _admin = new Admin({
        Name,
        email,
        hash_password,
      });

      _admin.save((error, data) => {
        if (error) {
          return res.json({
            message: "Something went wrong",
          });
        }

        if(data) {
          return res.status(201).json({
            message: "User created Successfully..!",
          });
        }
      });
    });
  });
};

exports.signin = (req, res) => {
  
    Admin.findOne({ email: req.body.email }).exec(async (error, admin) => {
      if (error) return res.json({ error });
      if (admin) {
        const isPassword = await admin.authenticate(req.body.password);
        if (isPassword && (admin.role === "admin" || admin.role === "super-admin")) {
          const token = jwt.sign(
            { _id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          const { _id, Name, email, role } = admin;
          res.cookie("token", token, { expiresIn: "1d" });
          res.json({
            token,
            admin: { _id, Name, email, role },
          });
          
        } else {
          return res.json({
            message: "Invalid Password",
          });
        }
      } else {
        return res.json({ message: "User not found please signup" });
      }
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.redirect('/');
};