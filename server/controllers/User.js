import userService from '../services/User.js';

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({data: users});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
};
