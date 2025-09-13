import { z } from "zod";

export const registerSchema = z
.object({
  fname: z.string().min(1, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  mobile: z.string().min(1,"Maximum 10 numbers should be there").optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password confirmation is required"),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  requirement: z.string().min(1, "Type Your Subject here"),
  message: z.string().min(1, "Type Your Message here"),
});

export type ContactFormInput = z.infer<typeof formSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email or Mobile Number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const coupenApplySchema = z.object({
  id: z.string(),
  coupenapply: z.string().min(1, "Please enter the license key"),
});

export type CoupenApplyFormInputs = z.infer<typeof coupenApplySchema>;

export const passwordResetSchema = z
  .object({
    current_password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.new_password === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export type PasswordResetFormInputs = z.infer<typeof passwordResetSchema>;

export const InitialDataSchema = z.object({
  id: z.string(),
  file: z.string().optional(),
  category: z.string().optional(),
  juniormodel: z.string().optional(),
  junioractor: z.string().optional(),
  fname: z.string(),
  lname: z.string(),
  dob: z.string().optional(),
  email: z.string().email(),
  mobile: z.string(),
  wmobile: z.string().optional(),
  show_number: z.string().optional(),
  father: z.string().optional(),
  mother: z.string().optional(),
  password: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  description: z.string().optional(),
  short_description: z.string().optional(),
  exp_title: z.string().optional(),
  experiance: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  bust: z.string().optional(),
  waist: z.string().optional(),
  hips: z.string().optional(),
  skincolor: z.string().optional(),
  eyecolor: z.string().optional(),
  haircolor: z.string().optional(),
  cloth: z.string().optional(),
  shoes: z.string().optional(),
  insta: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  twitter: z.string().optional(),
  favourite: z.number().optional(),
  status: z.string().optional(),
  fashion: z.string().optional(),
  sport: z.string().optional(),
  swimwear: z.string().optional(),
  lingerie: z.string().optional(),
  promotional: z.string().optional(),
  dressed: z.string().optional(),
  magazine: z.string().optional(),
  ramp: z.string().optional(),
  others: z.string().optional(),
  classic: z.string().optional(),
  method: z.string().optional(),
  practical: z.string().optional(),
  theatre: z.string().optional(),
  meisner: z.string().optional(),
  strasberg: z.string().optional(),
  leading: z.string().optional(),
  character: z.string().optional(),
  presentational: z.string().optional(),
  imag1: z.string().optional(),
  imag2: z.string().optional(),
  imag3: z.string().optional(),
  imag4: z.string().optional(),
  imag5: z.string().optional(),
  imag6: z.string().optional(),
  imag7: z.string().optional(),
  imag8: z.string().optional(),
  imag9: z.string().optional(),
  imag10: z.string().optional(),
  video1: z.string().optional(),
  video2: z.string().optional(),
  video3: z.string().optional(),
  video4: z.string().optional(),
  video5: z.string().optional(),
});


// TypeScript Type Inference (Optional)
export type InitialDatas = z.infer<typeof InitialDataSchema>;
