import { Schema, Model, model } from 'mongoose';

interface IUser {
    name: string;
    email: string;
}

interface ITask {
    title: string;
    description: string;
    user: IUser
}

const TaskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { collection: 'Tasks' });

const Task: Model<ITask> = model('Task', TaskSchema);

export { Task, ITask }