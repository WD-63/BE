import { z } from 'zod/v4';
// Define an schema. A template for an object
const postSchema = z.object({
    title: z.string().trim().min(3).max(256),
    content: z.string().trim().min(3).max(10000),
    userId: z.number().int().min(1),
});

export default postSchema;
