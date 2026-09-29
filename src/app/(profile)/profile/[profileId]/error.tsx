"use client";

import { useEffect } from "react";

// Catches render errors in this segment so users see a recoverable message
// instead of Next.js's blank "Application error: a client-side exception".
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container text-center" style={{ padding: "80px 16px" }}>
      <h2>Something went wrong while loading this profile.</h2>
      <p>Please try again. If the problem continues, log out and log back in.</p>
      <button className="theme-btn rounded-pill" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
