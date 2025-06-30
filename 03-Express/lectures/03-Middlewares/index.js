import dotenv from "dotenv";
import express from "express";
import sequelize from "./DB/sequelize.js";
import postsRouter from "./routes/postsRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

// Initialize Sequelize and sync models
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and models synced successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Express and Sequelize example!");
});

app.use("/*splat", (req, res) => {
  throw new Error("Page not found", { cause: 404 });
});

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
