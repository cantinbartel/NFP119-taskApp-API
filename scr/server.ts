import express, { Application } from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config()
const app: Application = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const port = Number(process.env.PORT!) | 8080;

app.listen(port, async () => {
    await dbConnect();
    console.log(`Server running on port ${port}`);
}); 
