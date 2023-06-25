import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        city: String,
        state: String,
        country: String,
        occupation: String,
        phoneNumber: String,
        transactions: Array,
        role: {
            type: String,
            enum: ['user', 'admin', 'superadmin'],
            default: 'admin',
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
