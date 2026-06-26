import { serverFetch } from "../core/server";

// PROMPTS

export const getPrompt = (params = {}) => {

  const cleanParams = Object.fromEntries(
    Object.entries(params || {}).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== ""
    )
  );

  const query = new URLSearchParams(cleanParams).toString();

  return serverFetch(
    `/api/prompts${query ? `?${query}` : ""}`
  );
};

// featured function
export const getFeaturedPrompts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts/featured`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch featured prompts");
  }

  return res.json();
};


export const getPromptById = (promptId) => {
  return serverFetch(`/api/prompts/${promptId}`);
};

export const getMyPrompts = (userId) => {
  return serverFetch(`/api/prompts?userId=${userId}`);
};


// UPDATE PROMPT
export const updatePrompt = (promptId, data) => {
  return serverFetch(`/api/prompts/${promptId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// DELETE PROMPT
export const deletePrompt = (promptId) => {
  return serverFetch(`/api/prompts/${promptId}`, {
    method: "DELETE",
  });
};

// =====================
// COPY COUNT
// =====================

export const CopyCount = (promptId) => {
  return serverFetch(`/api/prompts/${promptId}/copy`, {
    method: "PATCH",
  });
};

// =====================
// BOOKMARKS
// =====================

export const toggleBookmark = ({ userId, promptId }) => {
  return serverFetch("/api/bookmarks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, promptId }),
  });
};

export const getBookmarks = (userId) => {
  return serverFetch(`/api/bookmarks?userId=${userId}`);
};

// =====================
// REVIEWS
// =====================

export const getReviews = (query) => {
  const params = new URLSearchParams(query).toString();
  return serverFetch(`/api/review?${params}`);
};

export const createReview = ({ promptId, rating, comment, userId }) => {
  return serverFetch("/api/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      promptId,
      rating,
      comment,
      userId,
    }),
  });
};