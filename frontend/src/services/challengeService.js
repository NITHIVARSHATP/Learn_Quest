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

// ✅ Add this to handle creation
export async function createChallenge(challengeData) {
  const res = await fetch(`${API_BASE}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(challengeData),
  });

  if (!res.ok) {
    throw new Error("Failed to create challenge");
  }

  return res.json();
}


export async function fetchChallengeDetails(id) {
  const res = await fetch(`${API_BASE}/quest/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch challenge details");
  }
  return res.json();
}