// resetServerActions.js
export const resetPassword = async (mobile:string, password:string) => {

  try {
    const response = await fetch("https://admin.anantainternationals.com/api/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
        password,
      }),
    });

    const data = response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to reset password.");
    }

    return data; // Assuming the API returns a success response as JSON
  } catch (error) {
    console.error("Error in resetPassword:", error);
    throw error;
  }
};
