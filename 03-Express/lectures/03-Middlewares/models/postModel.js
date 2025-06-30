import { DataTypes } from "sequelize";
import sequelize from "../DB/sequelize.js";

const Post = sequelize.define(
  "Post",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: true }
);

Post.sync();

export default Post;
