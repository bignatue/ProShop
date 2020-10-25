import AsyncHandler from 'express-async-handler'
import generateToken from '../Utils/GenerateToken.js'
import User from '../Models/UserModel.js'

// @desc Auth user & get token
// @route POST /api/users/login
// @access public
const authUser = AsyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password!')
    }
})


// @desc Register new user
// @route POST /api/users
// @access public
const registerUser = AsyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    const userExists = await User.findOne({email})

    if(userExists) {
        
    } else {
        res.status(400)
        throw new Error('User already exists!')
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data!')
    }
})

// @desc Auth user profile
// @route POST /api/users/profile
// @access private
const getUserProfile = AsyncHandler(async (req, res) => {
 
    const user = await User.findById(req.user._id)
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})

export { authUser, registerUser, getUserProfile }