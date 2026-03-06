import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

const mongoURI = "mongodb+srv://pjsskarthik_db_user:rDv1VK7iKctu2pcD@cluster0.2y4oin4.mongodb.net/streamify?appName=Cluster0";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};