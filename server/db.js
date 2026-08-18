import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, 'data.json');

// ========== 纯 JavaScript 文件数据库 ==========
// 零原生依赖，直接读写 JSON 文件，保证在任何机器上都能跑

function load() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('读取数据文件失败，使用初始数据:', e.message);
  }
  return {
    bots: [],
    messages: [],
    settings: {
      api_base_url: 'https://api.deepseek.com',
      default_model: 'deepseek-chat',
    },
    nextId: { bot: 1, message: 1 },
  };
}

function save(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// 初始化
let store = load();

// ========== Bots ==========
export function getAllBots() {
  return [...store.bots].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

export function getBot(id) {
  return store.bots.find(b => b.id === id) || null;
}

export function createBot({ name, avatar, avatar_type, personality, backstory, theme_color, model }) {
  const now = new Date().toISOString();
  const bot = {
    id: store.nextId.bot++,
    name: name.trim(),
    avatar: avatar || '🤖',
    avatar_type: avatar_type || 'emoji',
    personality: personality || '',
    backstory: backstory || '',
    theme_color: theme_color || '#6366f1',
    model: model || 'deepseek-chat',
    created_at: now,
    updated_at: now,
  };
  store.bots.push(bot);
  save(store);
  return bot;
}

export function updateBot(id, updates) {
  const idx = store.bots.findIndex(b => b.id === id);
  if (idx === -1) return null;
  const bot = store.bots[idx];
  if (updates.name !== undefined) bot.name = updates.name;
  if (updates.avatar !== undefined) bot.avatar = updates.avatar;
  if (updates.avatar_type !== undefined) bot.avatar_type = updates.avatar_type;
  if (updates.personality !== undefined) bot.personality = updates.personality;
  if (updates.backstory !== undefined) bot.backstory = updates.backstory;
  if (updates.theme_color !== undefined) bot.theme_color = updates.theme_color;
  if (updates.model !== undefined) bot.model = updates.model;
  bot.updated_at = new Date().toISOString();
  save(store);
  return bot;
}

export function deleteBot(id) {
  const botIdx = store.bots.findIndex(b => b.id === id);
  if (botIdx === -1) return false;
  store.bots.splice(botIdx, 1);
  // 级联删除消息
  store.messages = store.messages.filter(m => m.bot_id !== id);
  save(store);
  return true;
}

// ========== Messages ==========
export function getMessages(botId) {
  return store.messages
    .filter(m => m.bot_id === botId)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
}

export function saveMessage(botId, role, content) {
  const msg = {
    id: store.nextId.message++,
    bot_id: botId,
    role,
    content,
    created_at: new Date().toISOString(),
  };
  store.messages.push(msg);
  save(store);
  return msg;
}

export function clearMessages(botId) {
  store.messages = store.messages.filter(m => m.bot_id !== botId);
  save(store);
}

export function getRecentMessages(botId, limit = 20) {
  return store.messages
    .filter(m => m.bot_id === botId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit)
    .reverse();
}

// ========== Settings ==========
export function getSettings() {
  return { ...store.settings };
}

export function getSetting(key) {
  return store.settings[key] || null;
}

export function updateSettings(updates) {
  if (updates.api_key !== undefined) store.settings.api_key = updates.api_key;
  if (updates.api_base_url !== undefined) store.settings.api_base_url = updates.api_base_url;
  if (updates.default_model !== undefined) store.settings.default_model = updates.default_model;
  save(store);
}
