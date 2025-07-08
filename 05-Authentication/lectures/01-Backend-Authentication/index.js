import express from "express";
import "./db/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import postsRouter from "./routes/postRouter.js";
import usersRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/*splat", (req, res) => {
  throw new Error("Page not found", { cause: 404 });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
