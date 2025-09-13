import { ContactFormInput } from "@/types/zodValidation";

// Server action function
export async function handleContactForm(formData: ContactFormInput) {
  // Convert FormData to an object

  try {
    const response = await fetch("https://admin.anantainternationals.com/api/addContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.requirement,
        message: formData.message,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit the form.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "An Unknown error Occured",error };
  }
}
