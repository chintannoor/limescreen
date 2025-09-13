import { CoupenApplyFormInputs } from "@/types/zodValidation";

export const applyCoupon = async (formData: CoupenApplyFormInputs) : Promise<any> => {
  try {
    const response = await fetch(" https://admin.limescreen.net/api/coupenApply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: formData.id,
        coupenapply: formData.coupenapply, // Send the entered license key
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error applying coupon:", error);
    alert("An error occurred while applying the coupon. Please try again.");
  }
};
