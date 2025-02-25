const Joi =  require('joi');

const validateUserRegister = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    next();
};

const validateUserLogin = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
  
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    next();
  };
module.exports = { validateUserRegister, validateUserLogin };
