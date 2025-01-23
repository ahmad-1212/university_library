import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Full Name must contain at least 3 characters"),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required!"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
