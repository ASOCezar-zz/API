const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');

const UserController = {

  show: async (req, res) => {
    let users = await User.find({}, {name:1, _id:0})
    console.log(users)
    let count = await User.count()

    
    return res.status(200).json({
      users,
      count
    })
  },

   store: async (req, res) => {


    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({
        error: true,
        message: "Dados inválidos"
      })
    }



    let userExist = await User.findOne({ email: req.body.email });
    if(userExist) {
      return res.status(400).json({
        error: true,
        message: "Hmm, sinto que conheço esse email..."
      })
    }

    const { name, email, password } = req.body;


    const data = { name, email, password };

    data.password = await bcrypt.hash(data.password, 8);

    await User.create(data, (err) => {
      if(err) return res.status(400).json({
          error: true,
          message: "Erro ao tentar inserir usuário no MongoDB"
        })

        return res.status(200).json({
          error: false,
          message: "Sucess"
        })
    })
  }
}

module.exports = UserController;