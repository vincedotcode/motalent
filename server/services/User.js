import User from '../models/User.js';

const getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const getAllUsers = async () => {
    return User.find();
};

const updateUser = async (userId, updateData) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    Object.assign(user, updateData);
    await user.save();
    return user;
};

const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export default {
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
};
