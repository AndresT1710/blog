const API_URL = "http://localhost:4000/api/posts";

export const getPosts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};