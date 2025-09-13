// sendOtpServerAction.ts
export async function sendOtpOnMobileNo(mobile: string) {
  try {
    const response = await fetch(
      "https://admin.anantainternationals.com/api/sendOtpOnMobileNo",
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

export async function verifyOtpOnMobileNo(
  mobile: string,
  otp: string
) {
  try {
    const response = await fetch("https://admin.anantainternationals.com/api/verifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, otp }),
    });


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

// lib/ServerAction.ts

export async function changeMobileNo(mobile: string, id: string) {
  if (!id || !mobile) {
    throw new Error("Missing required fields");
  }
  

  try {
    // Send request to the external API
    const response = await fetch("https://admin.anantainternationals.com/api/changeMobileNo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile ,id }),
    });

    if (response.status === 400) {
      throw new Error("Mobile number already exists");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    alert(error);
    throw error;
  }
}
