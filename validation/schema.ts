// src/validation/schemas.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .nonempty("Email is required")
    .email("Invalid email format"),
  password: z
    .string({ required_error: "Password is required" })
    .nonempty("Password is required")
    .min(4, "Password must be at least 4 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .nonempty("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: z

      .string({ required_error: "Last name is required" })
      .nonempty("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    birthdate: z
      .string({ required_error: "Birthdate is required" })
      .nonempty("Birthdate is required")
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
    email: z
      .string({ required_error: "Email is required" })
      .nonempty("Email is required")
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Password is required" })
      .nonempty("Password is required")
      .min(4, "Password must be at least 4 characters"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
export type SignupApiPayload = Omit<SignupFormData, "confirmPassword">;
