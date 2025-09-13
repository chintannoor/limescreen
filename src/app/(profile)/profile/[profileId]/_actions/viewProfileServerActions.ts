export async function viewProfile(link: string, id: string) {
  if (!link || !id) {
    console.error("Missing required parameters:", { link, id });
    throw new Error("ID and LINK are required.");
  }

  const requestBody = JSON.stringify({ link, id });

  try {
    const response = await fetch("https://admin.limescreen.net/api/viewProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error Response Body: ${errorText}`);
      throw new Error(`Failed to fetch user profile. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { status: 0, data: null, message: "Error fetching user profile" };
  }
}
