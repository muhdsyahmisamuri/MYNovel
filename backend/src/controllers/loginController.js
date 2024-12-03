import bcrypt from 'bcrypt';
import User from '../models/user.js';
import generateOtp from '../utils/generateOtp.js';

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Identifier and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email: identifier } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const otp = generateOtp();
    await user.update({ otp });

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        provider: user.provider,
        resetPasswordToken: user.resetPasswordToken,
        confirmationToken: user.confirmationToken,
        confirmed: user.confirmed,
        blocked: user.blocked,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        nationality: user.nationality,
        phoneNumber: user.phoneNumber,
      },
      otp,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
