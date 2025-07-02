import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email must be unique"],
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
