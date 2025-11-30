const User = require('../models/userModel')
const about = (req, res) => {
  res.status(200).send({message: "Welcome to the About Page"})
}

const adminDashboard = async (req, res) => {
  try {
    const users = await User.find()
    if(!users) return res.status(500).json({message: 'Internal or Server error, cannot find users'})
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Internal or Server error'})
  }
}

const deleteUser = async (req, res) => {
  const uid = req.params.uid
  try {
   const delUser = await User.deleteOne({_id: uid})
   if(delUser.deletedCount === 0) return res.status(500).json({message: 'Internal or Server error, cannot delete user'})
   res.status(200).json({message: 'User deleted Successfuly'})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Internal or Server error', error: error.message})
  }
}

module.exports = {
  about,
  adminDashboard,
  deleteUser
}