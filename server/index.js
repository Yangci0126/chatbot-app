import express from 'express';
import cors from 'cors';
import botsRouter from './routes/bots.js';
import chatRouter from './routes/chat.js';
import settingsRouter from './routes/settings.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API 路由
app.use('/api/bots', botsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/settings', settingsRouter);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 聊天机器人服务器已启动：http://localhost:${PORT}`);
});
