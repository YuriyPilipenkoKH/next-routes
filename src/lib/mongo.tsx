'use server'

import mongoose from "mongoose"

const connectMongoDb = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL!)
    } 
    catch (error) {
        
    }
    
}
export default connectMongoDb