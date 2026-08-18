import { Router } from 'express';
import { getSettings, updateSettings } from '../db.js';

const router = Router();

// 获取所有设置
router.get('/', (req, res) => {
  res.json(getSettings());
});

// 更新设置
router.put('/', (req, res) => {
  updateSettings(req.body);
  res.json({ success: true });
});

export default router;
