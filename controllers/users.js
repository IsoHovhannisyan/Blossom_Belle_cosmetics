const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SMS = require('../twilio/sms.js'); 

/**
 * @route POST api/user/login
 * @desc User login
 * @access Public
 */

const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
};


const initiatePasswordReset = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                phoneNumber: phoneNumber
            }
        });

        // Проверяем, найден ли пользователь с таким номером телефона
        if (!user) {
            // Отправляем сообщение о том, что номер телефона не найден
            return res.status(404).json({ message: "Phone number not found" });
        }

        // Генерируем код подтверждения
        const verificationCode = generateVerificationCode().toString();
        
        // Обновляем запись пользователя с сгенерированным кодом
        await prisma.user.updateMany({
            where: {
                phoneNumber: phoneNumber,
            },
            data: {
                resetCode: verificationCode
            }
        });

        // Отправляем SMS с кодом
        await SMS(phoneNumber, `Your verification code is: ${verificationCode}`);

        // Возвращаем сообщение об успешной отправке SMS
        return res.status(200).json({ message: "A verification code has been sent to your phone number" });
    } catch (error) {
        console.error('Error initiating password reset:', error);
        // Отправляем сообщение об ошибке
        return res.status(500).json({ message: "An error occurred while initiating password reset" });
    }
};


const verifyCode = async(req, res)=> {
    const {phoneNumber, verificationCode} = req.body

    if (!phoneNumber || !verificationCode) {
        return res
            .status(400)
            .json({ message: "Please fill in all required fields" });
    }
    try{
        const user = await prisma.user.findFirst({
            where: {
                phoneNumber: phoneNumber
            }
        });
        if (user.resetCode === verificationCode){
            return  res.status(200).json({ message: user.email });
        }

        throw ({ message: "Verification code do not match" });

    }catch(error){
        return  res.status(500).json({ message: error });
    }
}


const resetPassword = async (req, res) => {
    const { phoneNumber, verificationCode, newPassword } = req.body;

    if (!phoneNumber || !verificationCode || !newPassword) {
        return res
            .status(400)
            .json({ message: "Please fill in all required fields" });
    }

    try {
        // Fetch user record based on phone number
        const user = await prisma.user.findFirst({
            where: {
                phoneNumber: phoneNumber
            }
        });

        // Check if verification code matches
        if (user.resetCode === verificationCode) {
            // Reset password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.updateMany({
                where: {
                    phoneNumber: phoneNumber
                },
                data: {
                    password: hashedPassword,
                    resetCode: null // Clear reset code after successful password reset
                }
            });

            res.status(200).json({ message: "Password reset successfully" });
        } else {
            res.status(400).json({ message: "Incorrect verification code" });
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: "An error occurred while resetting password" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Please fill in all required fields" });
    }

    const userEmail = email.toLowerCase(); // Convert email to lowercase

    const user = await prisma.user.findFirst({
        where: {
            email: userEmail, // Compare lowercase email with stored lowercase email
        },
    });

    const secret = process.env.JWT_SECRET;

    if (!user) {
        return res.status(400).json({ message: "Incorrect email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    if (secret) {
        return res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            resetCode: user.resetCode,
            favorites: user.favorites,
            token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
        });
    } else {
        return res.status(400).json({ message: "Failed to generate token" });
    }
};


const register = async (req, res) => {
    const { name, email, password, role, phoneNumber } = req.body;

    if (!name || !email || !password || !role || !phoneNumber) {
        return res
            .status(400)
            .json({ message: "Please fill in all required fields" });
    }

    const userEmail = email.toLowerCase(); // Convert email to lowercase

    const registeredUser = await prisma.user.findFirst({
        where: {
            email: userEmail, // Compare lowercase email with stored lowercase email
        },
    });

    if (registeredUser) {
        return res
            .status(400)
            .json({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            email: userEmail, // Store lowercase email
            name,
            password: hashedPassword,
            role,
            phoneNumber, // Add phone number during registration
        },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
        return res.status(201).json({
            id: user.id,
            email: user.email,
            name,
            role,
            phoneNumber,
            token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
        });
    } else {
        return res.status(400).json({ message: "Failed to create user" });
    }
};


const updateFavorites = async (req, res) => {
    const { userId } = req.params; 
    const { favorites } = req.body; 

    try {
        await prisma.user.updateMany({
            where: {
                id: userId,
            },
            data: {
                favorites,
            },
        });

        return res.status(200).json({ message: "Favorites updated successfully" });
    } catch (error) {
        console.error('Error updating favorites:', error);
        return res.status(500).json({ message: "An error occurred while updating favorites" });
    }
};

const getUserFavorites = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                favorites: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        return res.status(500).json({ message: "An error occurred while fetching user favorites" });
    }
};

const findProductByImage = async (req, res) => {
    const { modelName, image } = req.query; // Retrieving parameters from the query string

    if (!modelName || !image) {
        return res
            .status(400)
            .json({ message: "Please provide both modelName and image parameters" });
    }

    try {
        const model = prisma[modelName];

        if (!model) {
            return res
                .status(404)
                .json({ message: `Model ${modelName} not found in Prisma client` });
        }

        const products = await model.findMany({
            where: {
                image: image
            }
        });

        return res.status(200).json(products);
    } catch (error) {
        console.error(`Error finding products by image in model ${modelName}:`, error);
        return res.status(500).json({ message: `An error occurred while finding products by image in model ${modelName}` });
    }
};








/**
 * @route GET api/user/current
 * @desc Get current user
 * @access Private
 */
const current = async (req, res) => {
    return res.status(200).json(req.user);
};

module.exports = {
    login,
    register,
    current,
    initiatePasswordReset,
    verifyCode,
    resetPassword,
    updateFavorites,
    getUserFavorites,
    findProductByImage,
};

