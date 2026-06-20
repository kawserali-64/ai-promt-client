const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path, options = {}) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};