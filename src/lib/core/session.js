import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user || null;
  } catch (error) {
    console.log("Session error:", error);
    return null;
  }
};