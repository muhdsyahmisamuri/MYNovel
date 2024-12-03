import User from '../models/user.js';

export const validateOtp = async (req, res) => {
  const { identifier, code } = req.body;

  if (!identifier || !code) {
    return res.status(400).json({ message: 'Identifier and OTP code are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email: identifier } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided OTP matches the one stored in the database
    if (user.otp !== code) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    // Optionally, clear the OTP after successful validation
    await user.update({ otp: null });

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
    });
  } catch (error) {
    res.status(500).json({ message: 'Error validating OTP', error: error.message });
  }
};
