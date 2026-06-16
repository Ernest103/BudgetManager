const API_BASE = import.meta.env.VITE_API_URL || "/api";

function buildJsonHeaders(token) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
}

async function parseApiResponse(response) {
    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const message =
            (data && (data.message || data.error)) ||
            `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    return data;
}

export async function signUp({ name, email, password }) {
    const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: buildJsonHeaders(),
        body: JSON.stringify({ name, email, password }),
    });

    // Save token to localStorage if sign-up is successful
    const data = await parseApiResponse(response);
    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;
}

export async function signIn({ email, password }) {
    const response = await fetch(`${API_BASE}/auth/signin`, {
        method: "POST",
        headers: buildJsonHeaders(),
        body: JSON.stringify({ email, password }),
    });

    // Save token to localStorage if sign-in is successful
    const data = await parseApiResponse(response);
    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;
}

export async function getMe() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE}/auth/me`, {
        method: "GET",
        headers: buildJsonHeaders(token),
    });

    return parseApiResponse(response);
}

export async function validateSession() {
    const token = localStorage.getItem("token");

    if (!token) {
        return { authenticated: false, user: null };
    }

    try {
        const data = await getMe(); // calls /api/auth/me
        return { authenticated: true, user: data.user };
    } catch {
        localStorage.removeItem("token");
        return { authenticated: false, user: null };
    }
}

export function signOut() {
    localStorage.removeItem("token");
}