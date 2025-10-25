import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try {
        mongoose.connection.on("connected",()=>{
            console.log("MongoDB connected successfully");
        });
        let mongodbURI = process.env.MONGODB_URI;
        const projectName = "SwiftCV";
        if(!mongodbURI){
            throw new Error("MONGODB_URI is not defined in environment variables"); 

        }
        if(mongodbURI.endsWith("/")){
            mongodbURI = mongodbURI.slice(0,-1);
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`);
    }catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;