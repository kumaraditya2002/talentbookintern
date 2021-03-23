const Form = require('../models/form');

exports.fill = async (req, res) => {
    const { n, e, a, select1, select2, rbvalue, cbvalue} = req.body;
    const form = new Form({
        Name:n, 
        Email:e, 
        Age:a, 
        role:select1, 
        recommend:rbvalue, 
        FCC:select2, 
        Future:cbvalue
    });
  
    await form.save((error, form) => {
      if (error) return res.status(400).json({ error });
      if (form) {
        res.status(201).json({ form, files: req.files });
      }
    });

};

exports.forms = async (req,res)=>{
  const form = await Form.find({})
  .exec();
  res.render('formview',{data:form});
}