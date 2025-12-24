export const apiConfig = {
    baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:4000',
};
function getAccessToken() {
    return localStorage.getItem('repoint_access_token');
}
export async function apiGet(path) {
    const token = getAccessToken();
    const res = await fetch(`${apiConfig.baseUrl}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    if (!res.ok) {
        throw new Error(`API GET ${path} failed: ${res.status}`);
    }
    return (await res.json());
}
export async function apiPost(path, body) {
    const token = getAccessToken();
    const res = await fetch(`${apiConfig.baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`API POST ${path} failed: ${res.status} ${text}`);
    }
    return (await res.json());
}
