import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Resume from "../models/Resume.js";


const generateToken = (userId) =>
{
    // logic to generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '3d' });
    return token;
}

// controller for user registration

// POST: /api/users/register
export const registerUser = async (req, res) =>
{
    try
    {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
        {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser)
        {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(newUser._id);

        newUser.password = undefined;

        return res.status(201).json({ message: 'User created successfully', token, user: newUser });


    } catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
}


// controller for user login

// POST: /api/users/login
export const loginUser = async (req, res) =>
{
    try
    {
        const { email, password } = req.body;
        if (!email || !password)
        {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user)
        {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = user.comparePassword(password);
        if (!isPasswordValid)
        {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = generateToken(user._id);
        user.password = undefined;
        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
}

// controller for getting user by ID
// GET: /api/users/data

export const getUserById = async (req, res) =>
{
    try
    {
        const { userId } = req.userId;

        const user = await User.findById(userId);
        if (!user)
        {
            return res.status(404).json({ message: "User not found" });
        }
        user.password = undefined;

        return res.status(200).json({ user });
    } catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
}


// controller for getting user resumes
// GET: /api/users/resumes

export const getUserResumes = async (req, res) =>
{
    try
    {
        const userId = req.userId;

        const resumes = await Resume.find({ userId });
        return res.status(200).json({ resumes });
    } catch (error)
    {
        return res.status(500).json({ message: error.message });
    }
}