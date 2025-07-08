import { z } from "zod/v4";

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z.string().min(3, "Content must be at least 3 characters long"),
  user: z.string().length(24, "User must be a valid id"),
});

export default postSchema;
