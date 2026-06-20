import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getPrompt = async () => {
  return serverFetch('/api/prompts')
}

export const getPromptById = async (promptId) => {
  return serverFetch(`/api/prompts/${promptId}`)
}

export const getMyPrompts = async (userId) => {
  const res = await fetch(`${baseUrl}/api/prompts?userId=${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch prompts");
  }

  return res.json();
};