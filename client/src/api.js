const BASE = '/api';

async function request(url, options = {}) {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || '请求失败');
  }
  return data;
}

// Bots API
export const getBots = () => request('/bots');
export const getBot = (id) => request(`/bots/${id}`);
export const createBot = (data) => request('/bots', { method: 'POST', body: JSON.stringify(data) });
export const updateBot = (id, data) => request(`/bots/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteBot = (id) => request(`/bots/${id}`, { method: 'DELETE' });

// Chat API
export const getMessages = (botId) => request(`/chat/${botId}/messages`);
export const sendMessage = (botId, content) =>
  request(`/chat/${botId}/send`, { method: 'POST', body: JSON.stringify({ content }) });
export const clearMessages = (botId) => request(`/chat/${botId}/messages`, { method: 'DELETE' });

// Settings API
export const getSettings = () => request('/settings');
export const updateSettings = (data) => request('/settings', { method: 'PUT', body: JSON.stringify(data) });
