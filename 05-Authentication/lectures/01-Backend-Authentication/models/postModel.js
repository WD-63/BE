import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: 100,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      maxLength: 1000,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
