const { User, validate } = require('../models/user');
const bcrypt = require('bcryptjs');


exports.registerUser = async (req, res) => {
  try {
    const { error } = await validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: 'User with given email already exists!' });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { error } = await validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: 'Invalid Email or Password' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: 'Invalid Email or Password' });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: 'logged in successfully' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
