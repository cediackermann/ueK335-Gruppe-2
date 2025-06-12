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

export const bookFormSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .nonempty("Title is required")
    .min(2, "Title must be at least 2 characters"),
  isbn13: z
    .number({ required_error: "ISBN is required" })
    .min(10000000000, "Invalid ISBN format")
    .max(99999999999, "Invalid ISBN format"),
  num_pages: z
    .number({
      required_error: "Page number is required",
    })
    .int("Page number must be an integer")
    .positive("Page number must be positive"),
  publisher_id: z.number({
    required_error: "Publisher is required",
  }),
  language_id: z.number({
    required_error: "Language is required",
  }),
  publication_date: z
    .string({ required_error: "Publication date is required" })
    .nonempty("Publication date is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
});

export type BookFormData = z.infer<typeof bookFormSchema>;
