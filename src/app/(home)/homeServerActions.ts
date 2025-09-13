import { Artist, Investors, Testimonials } from "@/types/types";

export async function getArtists(): Promise<Artist[]> {
  try {
    const response = await fetch("https://admin.limescreen.net/api/getArtists", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      throw new Error("Failed to fetch data");
    }

    const data = await response.text();
    const artistList = JSON.parse(data);

    return artistList.data;
  } catch (error) {
    console.error("Error in getArtists:", error);
    return [];
  }

}

export async function fetchTestimonials():Promise<Testimonials[]> {
  try {
    const response = await fetch(" https://admin.limescreen.net/api/getTestimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      throw new Error("Failed to fetch data");
    }

    const data = await response.text();
    const testimonialList = JSON.parse(data);

    return testimonialList.data;
  } catch (error) {
    console.error("Error in getTestimonials:", error);
    return [];
  }
}

export async function fetchInvestors() : Promise<Investors[]> {
  try {
    const response = await fetch(" https://admin.limescreen.net/api/getInvestors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      throw new Error("Failed to fetch data");
    }

    const data = await response.text();
    const investorList = JSON.parse(data);

    return investorList.data;
  } catch (error) {
    console.error("Error in getTestimonials:", error);
    return [];
  }
}
