"use server";

import { formInterface } from "@/types/employer";
import { cookies } from "next/headers";

export async function getChartData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("job-app-token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/user/getchart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(`Failed to fetch chart data (status ${res.status})`);
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

    if (res.status === 200) {
      const text = await res.text();
      return text;
    } else {
      throw new Error(`Failed to fetch chart data (status ${res.status})`);
    }
  } catch (err) {
    console.error("Error in getChartData:", err);
    throw err;
  }
}

export async function addForm(form: formInterface) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("job-app-token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(form),
      cache: "no-store",
    });

    if (res.status === 201) {
      return res.status;
    } else {
      throw new Error(`Failed to add form (status ${res.status})`);
    }
  } catch (err) {
    console.error("Error in addForm:", err);
    throw err;
  }
}
