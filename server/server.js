import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

// DB Connection
await connectDB();

app.use(express.json());

// Dynamic CORS configuration
const allowedOrigins = [
    'http://localhost:5173', // Vite dev server
    'https://localhost:4173', // Vite preview
    process.env.FRONTEND_URL || 'https://*.vercel.app' // Production frontend URL
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.get('/', (req, res) =>
{
    res.send('Server is running');
})

app.use('/api/users', userRouter);

app.use('/api/resumes', resumeRouter);

app.use('/api/ai', aiRouter);

app.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`);
});
