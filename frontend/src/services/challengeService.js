// src/services/challengeService.js
const API_BASE = import.meta.env.VITE_API_URL;

export async function fetchChallenges(difficulty = "", search = "") {
  let url = `${API_BASE}/quests`;
  const params = [];

  if (difficulty) params.push(`difficulty=${difficulty}`);
  if (search) params.push(`search=${search}`);

  if (params.length > 0) url += `?${params.join("&")}`;

  const res = await fetch(url);
  return res.json();
}

export async function submitSolution(code, challenge_id) {
  const res = await fetch(`${API_BASE}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, challenge_id }),
  });

  return res.json();
}
