import {
  APIResponse,
  CityList,
  CountryList,
  InitialData,
  StatesList,
} from "@/types/types";

// Define the function to handle the editProfile API
export async function editProfile(id: string): Promise<APIResponse> {
  if (!id) {
    throw new Error("ID is required for editing profile.");
  }

  try {
    const response = await fetch("https://admin.limescreen.net/api/editProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to edit profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Return the parsed response
  } catch (error) {
    // alert("Failed to Load Data");
    throw error;
  }
}

export async function updateProfileImage(
  id: string,
  file: File
): Promise<Response> {
  try {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", file);

    const response = await fetch(
      "https://admin.limescreen.net/api/updateProfileImage",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update profile image: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    alert("Error updating profile image");
    throw error;
  }
}

export async function updateClientData(data: InitialData) {
  try {
    const response = await fetch(
      "https://admin.limescreen.net/api/updateClientData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    alert("Failed to update client data");
    throw error;
  }
}

export async function deleteImage(id: string, imageId: string) {
  try {
    const response = await fetch("https://admin.limescreen.net/api/deleteImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, imageId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete image");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteVideo(id: string, videoId: string) {
  try {
    const response = await fetch("https://admin.limescreen.net/api/deleteVideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, videoId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete video");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateColor(
  id: string,
  color: string
): Promise<Response> {
  try {
    // Validate required parameters
    if (!id || !color) {
      throw new Error("Both 'id' and 'color' are required.");
    }

    // Send the POST request
    const response = await fetch("https://admin.limescreen.net/api/updateColor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, color }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update color: ${response.statusText}`);
    }

    // Return the response JSON
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Error updating color");
    throw error;
  }
}

export async function getCountryList(): Promise<CountryList> {
  try {
    const response = await fetch("https://admin.limescreen.net/api/countryList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch country list. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching country list:", error);
    throw error;
  }
}

export async function getStatesByCountry(
  country_id: string
): Promise<StatesList> {
  try {
    const response = await fetch("https://admin.limescreen.net/api/fetchStates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country_id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch states. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
}

export async function getCityByState(state_id: string): Promise<CityList> {
  try {
    const response = await fetch("https://admin.limescreen.net/api/fetchCities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state_id }),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Cities. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Cities:", error);
    throw error;
  }
}

export async function uploadImageAction(id: string, file: File) {
  try {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", file);

    const response = await fetch(" https://admin.limescreen.net/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return false
    }

    return true;
  } catch (error) {
    alert("Error Uploading Image");
    throw error;
  }
}

export async function uploadVideoAction(id: string, file: File) {
  try {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", file);

    const response = await fetch("  https://admin.limescreen.net/api/uploadVideo", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    alert("Error uploading Video");
    throw error;
  }
}
