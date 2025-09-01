"use server";

import { cookies } from "next/headers";

export async function getChartData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("job-app-token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/user/userDetails`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      }
    );

    const text = await res.text();

    if (res.status !== 200) {
      console.error("Fetch failed:", res.status, res.statusText, text);
      throw new Error(`Failed to fetch chart data (status ${res.status})`);
    } else if (res.status === 200) {
      return text;
    }
  } catch (err) {
    console.error("Error in getChartData:", err);
    throw err;
  }
}

export async function getUserDetails() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("job-app-token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job_seeker/useDetails`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      }
    );

    const text = await res.text();

    if (res.status !== 200) {
      console.error("Fetch failed:", res.status, res.statusText, text);
      throw new Error(`Failed to fetch chart data (status ${res.status})`);
    } else if (res.status === 200) {
      return text;
    }
  } catch (err) {
    console.error("Error in getChartData:", err);
    throw err;
  }
}
