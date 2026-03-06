import express from 'express';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.listen(5001, () => {
  console.log('Server is running on port 3000');
  connectDB();
});
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use("/api/chats",chatRoutes)