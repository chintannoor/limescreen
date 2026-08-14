"use server";

export type ResetPasswordResult = {
  success: boolean;
  status: number;
  message: string;
};

export const resetPassword = async (
  mobile: string,
  password: string
): Promise<ResetPasswordResult> => {
  try {
    const response = await fetch(
      "https://admin.anantainternationals.com/api/resetPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, password }),
        cache: "no-store",
      }
    );

    // Read the body exactly once - the previous version called response.json()
    // twice, which throws "Body has already been read" and hid the real error.
    let payload: any = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      return {
        success: false,
        status: payload?.status ?? response.status,
        message: payload?.message || "Failed to reset password.",
      };
    }

    return {
      success: true,
      status: payload?.status ?? 200,
      message: payload?.message || "Password changed successfully.",
    };
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return {
      success: false,
      status: 503,
      message: "Could not reach the server. Please try again.",
    };
  }
};
