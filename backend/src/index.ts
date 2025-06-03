import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks';
import studentRoutes from './routes/students';
import { sequelize } from './config/database';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);
app.use('/students', studentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    await sequelize.sync();
    console.log('Database synchronized successfully.');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
      console.log(`🌐 Para acessar de outros dispositivos, use seu IP local`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer(); 