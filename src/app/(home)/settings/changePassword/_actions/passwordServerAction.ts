
export async function changePassword(id:string,current_password:string,new_password:string) {

  // Implement password change logic
  try {
    const response = await fetch("https://admin.anantainternationals.com/api/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, current_password, new_password }),
    });

    if (!response.ok) {
      throw new Error("Failed to change password");
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw new Error("Error occurred while changing password");
  }
}