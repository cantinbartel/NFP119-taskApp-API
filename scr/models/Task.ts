import { Schema, Model, model } from 'mongoose';

type IUser = {
    name: string;
    email: string;
};

type ITask = {
    title: string
    description: string
    completed: boolean
    user: IUser
};

const TaskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { collection: 'Tasks' });

const Task: Model<ITask> = model('Task', TaskSchema);

export { Task, ITask };
