import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import teacherRoutes from './routes/teacherRoutes.js';

dotenv.config();

// Initialize Firebase Admin SDK
import './config/firebase.js';
import { seedDatabase } from './config/seeder.js';
seedDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
app.use(cors({
  origin: '*', // For SIH Hackathon ease of local testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically
app.use('/uploads', express.static('uploads'));

// API Router Mount
app.use('/api/teacher', teacherRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`[RuralEdu Server] running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
