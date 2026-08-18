# AI 角色扮演聊天机器人 🤖

一个可自由定制 AI 角色的角色扮演聊天应用。你可以创建任意性格、外貌、背景、世界观的角色，与 TA 实时对话、演绎剧情，甚至让多个角色同台飙戏。

## ✨ 功能特性

### 🎭 角色创建
- **完全自定义角色**：名字、性格、外貌、背景故事、基本信息
- **Emoji 头像 + 自定义头像**：选内置 Emoji，或上传图片自由裁剪成头像
- **主题色**：自定义角色的聊天气泡边框颜色
- **讲话风格**：描述角色的说话方式（方言、口癖、语气），AI 会严格模仿

### 🌍 世界观系统
- 创建自定义世界观（时代、科技水平、大事件）
- 角色绑定世界观后，AI 会自动遵守时代约束（不会在古代聊手机）

### 💬 单角色对话
- 实时流式对话，AI 用第三人称 + 括号动作描写
- **记忆系统**：长对话自动摘要，保持人物关系和剧情一致性
- **NPC 自动生成**：剧情涉及配角（男女朋友、同事、路人）时，AI 自动推断其性格并让他们"活过来"直接对话
- 消息可编辑、回复可重新生成、清空记录

### 📜 剧本模式（多角色）
- 创建剧本，挑选多个角色同台演绎
- AI 轮流扮演不同角色，推动剧情发展
- 同样支持消息编辑、重新生成、NPC 生成

### 🎨 AI 生图
- **角色立绘生成**：根据角色全部设定生成立绘，可设为头像或聊天背景
- **场景插图生成**：聊天中一键根据当前剧情生成场景图
- 支持 OpenAI 兼容的生图 API（Seedream、NanoBanana、Flux 等）
- 图片可保存到手机、重新生成

### 🛠 其他
- 邮箱注册/登录（Supabase Auth）
- 明暗主题切换
- 桌面端 + 移动端响应式适配
- 数据导入/导出
- 自定义聊天背景

## 🏗 技术架构

| 层 | 技术 |
|----|------|
| 前端 | React 18（单 HTML 文件，JSX 预编译） |
| 后端/数据库 | Supabase（Auth + PostgreSQL + RLS） |
| AI 对话 | 任意 OpenAI 兼容 API（DeepSeek、豆包、通义等） |
| AI 生图 | 任意 OpenAI 兼容生图 API（火山引擎 Seedream、NanoBanana 等） |

> **重要**：本项目是纯前端单文件应用，AI 对话和生图都直接在前端调用你填写的 API Key，**不经过任何中间服务器**。你的 API Key 存在你自己的 Supabase 数据库里（受 RLS 保护）。

## 🚀 快速部署

部署分两步：**后端（Supabase）** + **前端（静态托管）**。约 10 分钟搞定。

### 第一步：部署 Supabase 后端

1. 打开 [supabase.com](https://supabase.com)，注册账号，点击 **New Project** 创建一个免费项目（地区随便选，选离你近的）。

2. 进入项目后，左侧菜单打开 **SQL Editor**，点击 **New Query**。

3. 把本仓库的 [`supabase-complete.sql`](./supabase-complete.sql) 文件内容**完整复制粘贴**进去，点击 **Run**。这一步会自动创建全部 7 张表、行级安全策略和索引。

4. 左侧菜单 **Settings → API**，记下两个值：
   - **Project URL**（形如 `https://xxxx.supabase.co`）
   - **anon public** key（形如 `eyJhbGciOi...`，注意是 anon key，不是 service_role key）

### 第二步：配置代码

打开 `build.js`，找到文件开头附近这两行（约第 95-96 行），把值替换成你自己的：

```js
const SURL='https://你的项目.supabase.co';
const SKEY='你的 anon key';
```

### 第三步：构建

需要 [Node.js](https://nodejs.org)（18+ 版本）：

```bash
# 1. 安装依赖（Babel，用于编译 JSX）
npm install

# 2. 构建：生成 HTML 并编译 JSX 为纯 JS
node build.js
node transform.js
```

构建完成后，产物在 `github-pages/index.html`（以及 `deploy/index.html`）。

### 第四步：部署前端

任选一种静态托管方式：

**方式 A：GitHub Pages（推荐，开源项目标准）**

1. 把整个项目推到你自己的 GitHub 仓库
2. 仓库 **Settings → Pages**，Source 选 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)` 或 `github-pages`
3. 稍等片刻，访问 `https://你的用户名.github.io/仓库名/`

**方式 B：CloudStudio（腾讯云）**

1. 打开 [CloudStudio](https://cloudstudio.net)，新建沙箱
2. 把 `github-pages/index.html` 上传进去
3. 获得访问链接

**方式 C：任意静态托管**

`github-pages/index.html` 是单文件，可部署到 Vercel、Netlify、Cloudflare Pages 等任何静态托管平台。

### 第五步：在应用里配置 AI API

1. 打开部署好的网址，**注册一个账号并登录**
2. 进入左侧 **⚙️ 设置**：
   - **API Key**：填你的大模型 API Key（如 DeepSeek 的 `sk-...`）
   - **Base URL**：填 API 地址（如 `https://api.deepseek.com/v1`）
   - **默认模型**：填模型名（如 `deepseek-chat`）
3. （可选）往下滚动到 **🎨 生图 API**，填入生图服务的 Key / URL / 模型

## 🔑 获取 AI API Key 参考

| 用途 | 服务 | Base URL | 说明 |
|------|------|----------|------|
| 对话 | DeepSeek | `https://api.deepseek.com/v1` | 便宜好用，中文佳 |
| 对话 | 火山引擎豆包 | `https://ark.cn-beijing.volces.com/api/v3` | 字节官方 |
| 生图 | 火山引擎 Seedream | `https://ark.cn-beijing.volces.com/api/v3` | 模型如 `doubao-seedream-4-0-250828` |
| 生图 | 各类 NanoBanana 代理 | 各家不同 | 模型如 `nano-banana-pro` |

> 只要服务提供 **OpenAI 兼容接口**（`/chat/completions` 或 `/images/generations`），就能直接用。

## 📁 项目结构

```
chatbot-app/
├── build.js                # 构建脚本：生成 HTML（含 JSX 源码 + 配置）
├── transform.js            # Babel 编译脚本：JSX → 纯 JS
├── supabase-complete.sql   # 完整建表脚本（部署必跑）
├── github-pages/           # 构建产物（含 git 仓库）
│   └── index.html          # 最终部署的单文件应用
├── deploy/                 # 构建产物副本
├── supabase-schema.sql     # 旧版建表脚本（保留）
├── supabase-migrate.sql    # 增量迁移脚本（保留）
├── supabase-image-migrate.sql # 生图功能迁移脚本（保留）
├── client/                 # 早期前端脚手架（已废弃）
└── server/                 # 早期后端脚手架（已废弃）
```

## ⚠️ 注意事项

1. **API Key 安全**：本项目把所有配置存在你自己的 Supabase 数据库（RLS 保护）和浏览器 localStorage，**不会上传到任何第三方服务器**。但仍建议不要与他人共用账号。
2. **行级安全**：`supabase-complete.sql` 已为所有表开启 RLS，每个用户只能访问自己的数据。
3. **生图服务**：不同服务商的接口格式有差异，本项目支持 OpenAI 兼容格式（`/v1/images/generations`）。如用火山引擎，注意路径是 `/api/v3`。
4. **部署更新**：修改代码后需重新执行 `node build.js && node transform.js` 再重新部署。

## 📄 License

MIT License —— 可自由使用、修改、分发。
