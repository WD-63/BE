import { z } from 'zod/v4';

// Define an schema. A template for an object
const userSchema = z.object({
  firstName: z
    .string('First name must be a string.')
    .min(3, 'First name must be at least 3 characters')
    .max(30, 'First name cannot be longer than 30 characters'),
  lastName: z
    .string('Last name must be a string.')
    .min(3, 'Last name must be at least 3 characters')
    .max(30, 'Last name cannot be longer than 30 characters'),
  email: z.string('Email must be a string').email('Must be a valid email')
});

export default userSchema;
