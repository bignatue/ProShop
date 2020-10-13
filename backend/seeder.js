import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import Users from './Data/Users.js'
import Products from './Data/Products.js'
import User from './Models/UserModel.js'
import Product from './Models/ProductModel.js'
import Order from './Models/OrderModel.js'
import connectDB  from './Config/Db.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser = await User.insertMany(Users)
        const adminUser = createdUser[0]._id
        const sampleProducts = Products.map(product => {
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)
        
        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}
const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
 
        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}