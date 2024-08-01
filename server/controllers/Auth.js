import authService from '../services/Auth.js';

const registerUser = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json({ message: "User created successfully. Please verify your account. A verification email has been sent." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        res.json({ message: "User logged in successfully", user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await authService.getUserById(req.params.id);
        res.json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const result = await authService.verifyAccount(token);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await authService.forgotPassword(email);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const result = await authService.resetPassword(token, newPassword);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export default {
    registerUser,
    loginUser,
    getUserById,
    verifyEmail,
    forgotPassword,
    resetPassword,
};
