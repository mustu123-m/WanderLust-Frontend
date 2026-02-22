const BASE_URL = "http://localhost:8080/api";

export const fetchListings = async () => {
  const res = await fetch(`${BASE_URL}/listing`);
  if (!res.ok) throw new Error("Failed to fetch listings");
  return res.json();
};
