import { Schema, Model, model } from 'mongoose';

interface IUser {
    email: string;
    name: string;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    }
}, { collection: 'Users' });

const User: Model<IUser> = model('User', UserSchema);

export { User, IUser };
