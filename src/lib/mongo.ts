'use server'

import mongoose from "mongoose"

const connectMongoDb = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL!)
        console.log('connected to MongoDB')
    } 
    catch (error) {
        console.log('connection failed'+error)
        process.exit(1)
    }
    
}
export default connectMongoDb