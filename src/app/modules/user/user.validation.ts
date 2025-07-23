import z from "zod";
import { IsActive, Role } from "./user.interface";

export const userZodShemaToCreate = z.object({
  name: z
    .string({ message: "Name must be string" })
    .max(25, { message: "Max length is 25" })
    .min(3, { message: "Min length is 3" }),
  email: z.email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Must contain 8 characters" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must have at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must have at least 1 lowercase letter.",
    })
    .regex(/^(?=.*\d)/, { message: "Passowrd must have at least 1 digit" })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must have at least 1 special character",
    }),
  phone: z
    .string()
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
      message:
        "Only Bangladeshi format is allowed (01XXXXXXXXX | +8801XXXXXXXXX).",
    })
    .optional(),
  address: z
    .string({ message: "Address muste be string." })
    .max(100, { message: "Address can contain 100 characters at mos" })
    .optional(),
});

export const userZodShemaToUpdate = z.object({
  name: z
    .string({ message: "Name must be string" })
    .max(25, { message: "Max length is 25" })
    .min(3, { message: "Min length is 3" })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Must contain 8 characters" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must have at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must have at least 1 lowercase letter.",
    })
    .regex(/^(?=.*\d)/, { message: "Passowrd must have at least 1 digit" })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must have at least 1 special character",
    })
    .optional(),
  phone: z
    .string()
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
      message:
        "Only Bangladeshi format is allowed (01XXXXXXXXX | +8801XXXXXXXXX).",
    })
    .optional(),
  address: z
    .string({ message: "Address muste be string." })
    .max(100, { message: "Address can contain 100 characters at mos" })
    .optional(),
  role: z.enum(Object.values(Role)).optional(),
  isDeleted: z
    .boolean({ message: "This filed contain boolean type values." })
    .optional(),
  isActive: z.enum(Object.values(IsActive)).optional(),
  isVerified: z
    .boolean({ message: "isVerified field accepts boolean-typed value." })
    .optional(),
});
