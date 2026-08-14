"use server";

import { z } from "zod";
import { RegisterFormInputs, registerSchema } from "@/types/zodValidation";

const API_BASE = "https://admin.anantainternationals.com/api";

export type OtpResult = {
  status: number;
  message: string;
  data?: unknown;
};

export type RegisterActionResult = {
  success: boolean;
  message: string;
  data?: { id?: number | string; [key: string]: unknown };
  errors?: Record<string, string[] | undefined>;
};

async function postJson(path: string, body: unknown) {
  const response = await fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  // Read once; a Response body cannot be consumed twice.
  let payload: any = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  return { response, payload };
}

export async function sendOtpAction(mobile: string): Promise<OtpResult> {
  try {
    const { response, payload } = await postJson("sendOtpForRegistration", { mobile });

    if (!response.ok) {
      return {
        status: payload?.status ?? response.status,
        message: payload?.message || "Failed to send OTP.",
      };
    }

    return {
      status: payload?.status ?? 200,
      message: payload?.message || "OTP sent successfully",
      data: payload?.data,
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { status: 503, message: "Could not reach the OTP service. Please try again." };
  }
}

export async function verifyOtpAction(otp: string, mobile: string): Promise<OtpResult> {
  try {
    const { response, payload } = await postJson("verifyOtpForRegistration", { otp, mobile });

    if (!response.ok) {
      return {
        status: payload?.status ?? response.status,
        message: payload?.message || "Invalid OTP.",
      };
    }

    return {
      status: payload?.status ?? 200,
      message: payload?.message || "OTP verified",
      data: payload?.data,
    };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { status: 503, message: "Could not reach the OTP service. Please try again." };
  }
}

export async function registerAction(
  formData: RegisterFormInputs
): Promise<RegisterActionResult> {
  let validatedData;
  try {
    validatedData = registerSchema.parse({
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
      };
    }
    throw error;
  }

  try {
    const { response, payload } = await postJson("register", {
      fname: validatedData.fname,
      lname: validatedData.lname,
      email: validatedData.email,
      mobile: validatedData.mobile,
      password: validatedData.password,
      confirmPassword: validatedData.confirmPassword,
    });

    if (!response.ok) {
      return {
        success: false,
        message: payload?.message || "Registration failed",
      };
    }

    return {
      success: true,
      data: payload?.data,
      message: payload?.message || "Registration successful",
    };
  } catch (error) {
    console.error("Error in registerAction:", error);
    return {
      success: false,
      message: "Could not reach the registration service. Please try again.",
    };
  }
}
