export async function sharedViewProfile(userlink: string) {
    try {
        const response = await fetch(`https://admin.limescreen.net/api/${userlink}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
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
