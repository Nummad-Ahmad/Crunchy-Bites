const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userModel = require('./models/users');
const bcrypt = require('bcrypt');
const { sendVerificationCode, sendFeedback } = require('./email');
const mongoURI = 'mongodb://localhost:27017/users';
require('dotenv').config();
const jwt = require('jsonwebtoken')

dotenv.config();
const app = express();
const port = 3000;

const corsOptions = {
    origin: process.env.REACT_APP_FRONT_END, // Allow only frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend deployed successfully' });
});
app.get('/history', async (req, res) => {
    try {
        const email = req.query.email;
        const data = await imageModel.find({ sender: email });
        res.status(200).json({ message: 'Data found.', data: data });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server error', error: e.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ error: 'User not found. Please sign up first.' });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', user: existingUser });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const newUser = await userModel.create({ email, password: hashedPassword, name, isVerified: false, verificationCode });
        await sendVerificationCode(email, verificationCode);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.post('/verify', async (req, res) => {
    const { email, verificationCode } = req.body;
    try {
        const user = await userModel.findOneAndUpdate(
            { email, verificationCode },
            { $set: { isVerified: true }, $unset: { verificationCode: "" } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'Invalid verification code' });
        }
        res.status(200).json({ message: 'Account verified successfully' });
    } catch (e) {
        console.error('Error:', e);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.post('/forgotpassword', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = verificationCode;
        await user.save();
        await sendVerificationCode(email, verificationCode);
        return res.status(200).json({ message: 'Check your email for an OTP!' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});
app.post('/verifyforgotpassword', async (req, res) => {
    const { email, verificationCode, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.findOneAndUpdate(
            { email, verificationCode },
            { $set: { password: hashedPassword }, $unset: { verificationCode: "" } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'Invalid verification code' });
        }
        res.status(200).json({ message: 'Account verified successfully' });
    } catch (e) {
        console.error('Error:', e);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});


mongoose.connect(mongoURI).then(console.log("Connected")).catch(e => {
    console.log(e);
})

app.listen(port, () => {
    console.log('server started');
})




