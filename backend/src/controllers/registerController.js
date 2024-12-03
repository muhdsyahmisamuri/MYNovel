import bcrypt from "bcrypt";
import User from "../models/user.js";
import generateOtp from "../utils/generateOtp.js";

export const register = async (req, res) => {
  const requiredFields = [
    "email",
    "firstName",
    "lastName",
    "gender",
    "countryCode",
    "phoneNumber",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Validation Error",
      missingFields,
    });
  }

  const { email, firstName, lastName, gender, countryCode, phoneNumber } =
    req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with the provided email." });
    }

    const username = email;
    const password = await bcrypt.hash("Novel123", 10);
    const otp = generateOtp();

    const newUser = await User.create({
      email,
      username,
      password,
      firstName,
      lastName,
      gender,
      nationality: countryCode,
      phoneNumber,
      otp,
    });

    res.status(200).json({
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        provider: newUser.provider,
        resetPasswordToken: newUser.resetPasswordToken,
        confirmationToken: newUser.confirmationToken,
        confirmed: newUser.confirmed,
        blocked: newUser.blocked,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        gender: newUser.gender,
        nationality: newUser.nationality,
        phoneNumber: newUser.phoneNumber,
      },
      otp,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
