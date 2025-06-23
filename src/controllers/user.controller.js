import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apierror.js";
import { User } from "../models/user.models";
import { uploadToCloudinary } from "../utils/cloudinary";

import { ApiResponse } from "../utils/apiresponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "all ok",
  // });

  //steps to register a user...
  //--> get user details from frontend...
  //--> validation - not empty
  //--> check if user already exist: from both username or useremail...
  //--> check for images , check for avtar
  //--> upload to cloudinary..
  //--> create user object  - create entry in db
  //--> remove password and referesh tokens from frontend feed
  //--> check if user is created or not then return response or null...

  const { fullname, email, username, password } = req.body;
  console.log(email);

  //validation....
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverimageLocalPath = req.files?.coverimage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadToCloudinary(avatarLocalPath);
  const coverimage = coverimageLocalPath
    ? await uploadToCloudinary(coverimageLocalPath)
    : null;

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullname,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverimage?.url || null,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered succesfully"));
});

export { registerUser };
