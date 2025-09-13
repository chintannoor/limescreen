import { Actors, Models } from "@/types/types";

export async function getAllActors(page = 1): Promise<{
  data: Actors[];
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
  links: { url: string; label: string }[];
}> {
  try {
    const response = await fetch(
      `https://admin.limescreen.net/api/getActors?page=${page}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, // Sending page in body
      }
    );
    const data = await response.json();
    return {
      data: data.data.data,
      next_page_url: data.data.next_page_url,
      prev_page_url: data.data.prev_page_url,
      last_page: data.data.last_page,
      links: data.data.links,
    };
  } catch (error) {
    console.error("Error in getAllActors:", error);
    return {
      data: [],
      next_page_url: null,
      prev_page_url: null,
      last_page: 1,
      links: [],
    };
  }
}

export async function getAllModels(page = 1): Promise<{
  data: Models[];
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
  links: { url: string; label: string }[];
}> {
  try {
    const response = await fetch(
      `https://admin.limescreen.net/api/getModels?page=${page}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return {
      data: data.data.data,
      next_page_url: data.data.next_page_url,
      prev_page_url: data.data.prev_page_url,
      last_page: data.data.last_page,
      links: data.data.links,
    };
  } catch (error) {
    console.error("Error in getArtists:", error);
    return {
      data: [],
      next_page_url: null,
      prev_page_url: null,
      last_page: 1,
      links: [],
    };
  }
}
