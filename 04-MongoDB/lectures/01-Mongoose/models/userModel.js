import { Schema, model } from "mongoose";

const locationSchema = new Schema({
  country: String,
  city: String,
  zipCode: String,
});

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
    location: {
      type: locationSchema,
      default: {
        country: "",
        city: "",
        zipCode: "",
      },
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
