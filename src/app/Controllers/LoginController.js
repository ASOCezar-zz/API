const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/Auth');

const LoginController = {

  index: async (req, res) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if(!userExist){
      return res.status(400).json({
        error: true,
        message: "Nunca ouvi falar desse usuário..."
      })
    }

    if(!(await bcrypt.compare(password, userExist.password))) {
      return res.status(400).json({
        error: true,
        message: "Estou começando a duvidar que você é o dono desta conta..."
      })
    }

    return res.status(200).json({
      user: {
        name: userExist.name,
        email: userExist.email
      },
      token: jwt.sign(
        {id: userExist._id}, 
        config.secret, 
        {expiresIn: config.expireIn} 
      )
    })
  }
}

module.exports = LoginController;