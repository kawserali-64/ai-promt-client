import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

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


export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) {
    redirect('/auth/signin')
  }
  if (user?.role !== role) {
    redirect('/unauthorized')
  }
}

//ai tools 
export const requireNonAdmin = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user?.role === "Admin") {
    redirect("/unauthorized");
  }

  return user;
};