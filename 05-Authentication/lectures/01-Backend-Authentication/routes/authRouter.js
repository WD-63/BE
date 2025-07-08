import { Router } from "express";
import { signup, signin, me } from "../controllers/auth.js";
import validateBody from "../middlewares/validateSchema.js";
import { authSchema, userSchema } from "../zod/userSchema.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.route("/signup").post(validateBody(userSchema), signup);

authRouter.route("/signin").post(validateBody(authSchema), signin);

authRouter.route("/me").get(verifyToken, me);

export default authRouter;
