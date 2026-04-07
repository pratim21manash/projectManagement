import { UserModel } from "../models/user.models";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail";

const registerUser = asyncHandler(async (req, res) => {
  // getting data from client
  const { email, username, password } = req.body;

  //check if user already exist
  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  // if user exist, throw error
  if (existingUser) {
    throw new ApiError(400, "user with given email or username already exist");
  }

  // create new user
  const newUser = await UserModel.create({
    email,
    username,
    password,
    isEmailVerified: false,
  });

  // create temporary token for email verificaion
  const { unHashedToken, hashedToken, tokenExpiry } =
    newUser.generateTemporaryToken();

  newUser.emailVerificationToken = hashedToken;
  newUser.emailVerificationTokenExpiry = tokenExpiry;

  await newUser.save({ validateBeforeSave: false });

  //sending email
  await sendEmail({
    email: newUser.email,
    subject: "Please verify your email",
    mailgenCintent: emailVerificationMailgenContent(
      newUser.username,
      `${req.protocol}://${req.get("host")}/api/v1/auth/users/verify-email/${unHashedToken}`,
    ),
  });
});
