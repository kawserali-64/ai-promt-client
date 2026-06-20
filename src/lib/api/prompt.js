import { serverFetch } from "../core/server";
// PROMPTS
export const getPrompt = () => {
  return serverFetch("/api/prompts");
};

export const getPromptById = (promptId) => {
  return serverFetch(`/api/prompts/${promptId}`);
};

export const getMyPrompts = (userId) => {
  return serverFetch(`/api/prompts?userId=${userId}`);
};

// COPY COUNT UPDATE
export const CopyCount = (promptId) => {
  return serverFetch(`/api/prompts/${promptId}/copy`, {
    method: "PATCH",
  });
};



// REVIEWS

// GET REVIEWS (promptId / userId যেকোনো একটার জন্য)
export const getReviews = (query) => {
  const params = new URLSearchParams(query).toString();
  return serverFetch(`/api/review?${params}`);
};

// CREATE REVIEW
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