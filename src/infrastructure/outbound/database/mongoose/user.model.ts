import { Schema, model, Document } from 'mongoose';
import User from '../../../../domain/entities/user';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    uId: { type: String, required: true, unique: true},
});

const UserModel = model<User & Document>('User', userSchema);

export default UserModel;
