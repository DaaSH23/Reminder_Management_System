import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DB_uri, {
            dbName: 'RMS_Data'
        });
        console.log('Connected to the Database.');
    }catch(error){
        console.error('Error connecting to the database:', error);
        throw error; 
    }
}