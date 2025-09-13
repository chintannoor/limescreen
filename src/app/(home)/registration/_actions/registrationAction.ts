import { z } from "zod";
import { RegisterFormInputs, registerSchema } from "@/types/zodValidation";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function sendOtpAction(mobile: string) {
  // Implement OTP sending logic
  // Example:
  try {
    const response = await fetch(
      "https://admin.anantainternationals.com/api/sendOtpForRegistration",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send OTP");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Error occurred while sending OTP");
  }
}

export async function verifyOtpAction(otp: string, mobile: string) {
  // Implement OTP verification logic
  try {
    const response = await fetch(
      "https://admin.anantainternationals.com/api/verifyOtpForRegistration",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, mobile }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to verify OTP");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Error occurred while verifying OTP");
  }
}

export async function registerAction(formData: RegisterFormInputs) {
  // Extract data from form
  const fname = formData.fname;
  const lname = formData.lname;
  const email = formData.email;
  const mobile = formData.mobile;
  const password = formData.password;
  const confirmPassword = formData.confirmPassword;
  try {
    // Validate using existing Zod schema
    const validatedData = registerSchema.parse({
      fname,
      lname,
      email,
      mobile,
      password,
      confirmPassword,
    });

    // API call for registration
    const response = await fetch("https://admin.anantainternationals.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: validatedData.fname,
        lname: validatedData.lname,
        email: validatedData.email,
        mobile: validatedData.mobile,
        password: validatedData.password,
        confirmPassword: validatedData.confirmPassword,
      }),
    });
    const responseData = await response.json();

    // Check API response
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Registration failed",
      };
    }

    return {
      data: responseData.data,
      success: true,
      message: "Registration successful",
    };
  } catch (error) {
    // Handle validation or network errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
      };
    }
  }
}
