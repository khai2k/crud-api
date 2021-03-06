import UserModel from '../models/user'
import bcrypt from 'bcryptjs'

const user = {
  async createUser({ email, name, password }) {
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)
    let result = await UserModel.create({
      email,
      name,
      password: hash
    })
    console.log(result, 'resultresultresultresult')
    return result
    // bcrypt.genSalt(10, async (err, salt) => {
    //   bcrypt.hash(password, salt, async (err, hash) => {
    //     let result = await UserModel.create({
    //       email,
    //       name,
    //       password: hash
    //     })
    //     console.log(result, 'resultresultresultresult')
    //     return result
    //   })
    // })
  },
  async readUser(query) {
    let result = await UserModel.findById(query)
    return result
  },
  async readallUser()
  {
    let result= await UserModel.find({})
    return result
  },
  async updateUser(data, query) {
    let result = await UserModel.findOneAndUpdate({ _id: query }, data)
  },
  async deleteUser(query) {
    let result = await UserModel.findOneAndRemove({ _id: query })
  }
}

export default user
