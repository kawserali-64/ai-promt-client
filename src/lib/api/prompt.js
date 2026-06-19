const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const getPrompt = async (id) => {
//   const res = await fetch(`${baseUrl}/api/prompts/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch prompt");
//   }

//   return res.json();
// };



export const getMyPrompts = async (userId) => {
  const res = await fetch(`${baseUrl}/api/prompts?userId=${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch prompts");
  }

  return res.json();
};