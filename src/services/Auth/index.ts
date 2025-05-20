"use server";
import { jwtDecode } from "jwt-decode";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

export const loginUser = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  (await cookies()).set("accessToken", result.data);
  // console.log(result);

  return result;
};

export const logOut = async () => {
  (await cookies()).delete("accessToken");
};
export const getCurrentUser = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  if (token) {
    const result = jwtDecode(token as string);

    return result;
  } else {
    return null;
  }
};
