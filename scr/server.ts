import express, { Application } from 'express';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import dbConnect from './config/db';
import dotenv from 'dotenv';

dotenv.config()
const app: Application = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const port = 3000

app.listen(port, async () => {
    await dbConnect();
    console.log(`Server running on port ${port}`);
}); 
