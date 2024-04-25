import { z } from "zod";

export const AuthLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Email format is incorrect!" })
    .min(1, { message: "Email is required!" })
    .toLowerCase(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.!"
    })
    .max(18, { message: "Password should not exceed 18 characters long!" })
});
export type AuthLoginSchemaType = z.infer<typeof AuthLoginSchema>;

export const AuthSignUpSchema = z
  .object({
    name: z.string().trim().max(72, "Max Length Limit Exceeded!"),
    email: z
      .string()
      .trim()
      .email({ message: "Email format is incorrect!" })
      .min(1, { message: "Email is required!" })
      .toLowerCase(),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long.!"
      })
      .max(18, { message: "Password should not exceed 18 characters long!" }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long.!"
      })
      .max(18, { message: "Password should not exceed 18 characters long!" })
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"]
  });
export type AuthSignUpSchemaType = z.infer<typeof AuthSignUpSchema>;

export const AuthLogOutSchema = z.object({
  token: z.string().trim().min(1, "Token is required!")
});
export type AuthLogOutSchemaType = z.infer<typeof AuthLogOutSchema>;
