"use server";

const API_BASE = "https://admin.anantainternationals.com/api";

export type MobileActionResult = {
  status: number;
  message: string;
  data?: unknown;
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

export async function sendOtpOnMobileNo(mobile: string): Promise<MobileActionResult> {
  try {
    const { response, payload } = await postJson("sendOtpOnMobileNo", { mobile });

    if (!response.ok) {
      return {
        status: payload?.status ?? response.status,
        message: payload?.message || "Failed to send OTP",
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

export async function verifyOtpOnMobileNo(
  mobile: string,
  otp: string
): Promise<MobileActionResult> {
  try {
    const { response, payload } = await postJson("verifyOtp", { mobile, otp });

    if (!response.ok) {
      return {
        status: payload?.status ?? response.status,
        message: payload?.message || "Invalid OTP",
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

export async function changeMobileNo(
  mobile: string,
  id: string
): Promise<MobileActionResult> {
  if (!id || !mobile) {
    return { status: 400, message: "Missing required fields" };
  }

  try {
    const { response, payload } = await postJson("changeMobileNo", { mobile, id });

    if (!response.ok) {
      return {
        status: payload?.status ?? response.status,
        message:
          payload?.message ||
          (response.status === 400
            ? "Mobile number already exists"
            : "Failed to update mobile number"),
      };
    }

    return {
      status: payload?.status ?? 200,
      message: payload?.message || "Mobile number updated",
      data: payload?.data,
    };
  } catch (error) {
    console.error("Error changing mobile number:", error);
    return { status: 503, message: "Could not reach the server. Please try again." };
  }
}
