"use server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function getClientData() {
  const session = await getServerSession(options); // Get session using NextAuth
  
  if (!session || !session.user?.id) return null;

  try {
    const response = await fetch(`/artist/edit/${session.user.id}`, {
      cache: "no-store", // Prevent caching for fresh data
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error("Failed to fetch client data:", error);
  }

  return null;
};
