# AI 角色扮演聊天机器人 🤖

一个可自由定制 AI 角色的角色扮演聊天应用。你可以创建任意性格、外貌、背景、世界观的角色，与 TA 实时对话、演绎剧情，甚至让多个角色同台飙戏。

**纯前端单文件** · 数据存你自己的 Supabase · AI Key 自己填 · MIT 开源

## ✨ 功能特性

### 🎭 角色创建
- **完全自定义**：名字、基本信息、外貌、性格、背景故事、讲话风格
- **头像**：内置 Emoji，或上传图片自由裁剪（1:1）
- **主题色**：自定义角色气泡边框颜色
- **讲话风格**：描述角色的说话习惯（方言、口癖、语气），AI 会严格模仿
- **角色卡导入导出**：兼容 **Tavern v2 / v1** 标准格式，可与其他 RP 前端互通

### 🌍 世界观系统
- **自由文本撰写**：不限定格式，你怎么写 AI 就怎么理解——时代、科技、社会规则、势力关系、地理环境，随便写
- **可写具体要求**：比如写「每次回复必须描写环境氛围」，AI 会每次执行
- 角色绑定世界观后，AI 严格遵守其中的所有约束

### 📖 世界书（Lorebook）
- **关键词触发**：设定拆成一条条，只在对话提到关键词时才注入 AI
- **省 token**：长设定不再每轮全文塞进 Prompt
- 适合放人物小传、地点志、物品图鉴、历史事件等大量细节
- 支持启用/禁用单条、按优先级注入、自动去重上限

### 💬 单角色对话
- **设定执行铁律**：人物/世界观设定是硬约束，输出前自动自检
- **记忆系统**：长对话自动摘要，保持人物关系与剧情一致性
- **NPC 自动生成**：剧情涉及配角（男女朋友、同事、路人）时，AI 自动推断其性格，让他们真正出场说话
- **多回复候选**：重新生成不会丢旧回复，`◀ 1/3 ▶` 左右切换对比
- 消息可编辑（编辑后自动重新生成后续）、清空记录

### 📜 剧本模式（多角色）
- 创建剧本，自由撰写设定（同样支持写具体要求）
- 多角色同台演绎，AI 自动切换发言者
- **自动加载绑定世界观**，剧本 + 世界观双重约束
- 同样支持多回复候选、消息编辑、NPC 生成

### 🎨 AI 生图
- **角色立绘**：根据角色全部设定生成立绘，可设为头像或 9:16 聊天背景
- **场景插图**：一键根据当前剧情生成场景图
- 支持 OpenAI 兼容的生图 API（Seedream、NanoBanana、Flux 等）
- 图片可保存到手机、重新生成

### 🛠 其他
- 邮箱注册/登录（Supabase Auth + RLS）
- 明暗主题切换
- 桌面端 + 移动端响应式适配（含安全区适配）
- 全量数据备份导出/导入（角色、世界观、消息、世界书）
- 自定义聊天背景
- **请求超时保护**：网络异常时快速给出提示，不会无限卡死

## 🏗 技术架构

| 层 | 技术 |
|----|------|
| 前端 | React 18（单 HTML 文件，JSX 预编译为纯 JS） |
| 后端/数据库 | Supabase（Auth + PostgreSQL + RLS） |
| AI 对话 | 任意 OpenAI 兼容 API（DeepSeek、豆包、通义等） |
| AI 生图 | 任意 OpenAI 兼容生图 API（火山引擎 Seedream、NanoBanana 等） |

> **重要**：本项目是纯前端单文件应用，AI 对话和生图都直接在前端调用你填写的 API Key，**不经过任何中间服务器**。你的 API Key 存在你自己的 Supabase 数据库（受 RLS 保护）和浏览器本地，不会被上传到第三方。

## 🚀 快速部署

分两步：**后端（Supabase）** + **前端（静态托管）**，约 10 分钟。

### 第一步：部署 Supabase 后端

1. 打开 [supabase.com](https://supabase.com) 注册账号，点击 **New Project** 创建免费项目（地区选离你近的）。

2. 左侧菜单进入 **SQL Editor** → **New Query**。

3. 复制 [`supabase-complete.sql`](./supabase-complete.sql) 的**全部内容**粘贴进去，点击 **Run**。

   > 这一个脚本会创建全部 8 张表、所有字段、RLS 策略和索引。
   > **老版本升级也跑同一份脚本**——里面的 `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` 会自动补齐新增字段，不会影响已有数据。

4. 左侧 **Settings → API**，记下两个值：
   - **Project URL**（形如 `https://xxxx.supabase.co`）
   - **anon public** key（形如 `eyJhbGciOi...`，注意是 anon key，**不是** service_role key）

### 第二步：配置代码

打开 `build.js`，找到开头这两行（约第 95-96 行），换成你自己的：

```js
const SURL='https://你的项目.supabase.co';
const SKEY='你的 anon key';
```

### 第三步：构建

需要 [Node.js](https://nodejs.org)（18+）：

```bash
npm install        # 安装 Babel 依赖
node build.js      # 生成 HTML（含 JSX 源码）
node transform.js  # 编译 JSX 为纯 JS
```

产物：`github-pages/index.html`（以及 `deploy/index.html`）。

### 第四步：部署前端

**方式 A：GitHub Pages（推荐，项目自带自动部署）**

1. 把项目推到你自己的 GitHub 仓库
2. 仓库 **Settings → Pages → Build and deployment → Source** 选 **`GitHub Actions`**
3. 项目已内置 `.github/workflows/deploy-pages.yml`，每次 `git push` 自动把 `github-pages/` 部署到 Pages
4. 访问 `https://你的用户名.github.io/仓库名/`

**方式 B：CloudStudio（腾讯云）**

1. 打开 [CloudStudio](https://cloudstudio.net) 新建沙箱
2. 上传 `github-pages/index.html`
3. 获得访问链接

**方式 C：任意静态托管**

`github-pages/index.html` 是单文件，可放 Vercel、Netlify、Cloudflare Pages 等任何静态托管。

### 第五步：在应用里配置 AI API

1. 打开部署好的网址，**注册账号并登录**
2. 进入左侧 **⚙️ 设置**：
   - **API Key**：你的大模型 Key（如 DeepSeek 的 `sk-...`）
   - **Base URL**：API 地址（如 `https://api.deepseek.com/v1`）
   - **默认模型**：模型名（如 `deepseek-chat`）
3. （可选）往下滚到 **🎨 生图 API**，填生图服务的 Key / URL / 模型

## 🔑 API Key 参考

| 用途 | 服务 | Base URL | 说明 |
|------|------|----------|------|
| 对话 | DeepSeek | `https://api.deepseek.com/v1` | 便宜好用，中文佳 |
| 对话 | 火山引擎豆包 | `https://ark.cn-beijing.volces.com/api/v3` | 字节官方 |
| 生图 | 火山引擎 Seedream | `https://ark.cn-beijing.volces.com/api/v3` | 模型如 `doubao-seedream-4-0-250828` |
| 生图 | 各类 NanoBanana 代理 | 各家不同 | 模型如 `nano-banana-pro` |

> 只要服务提供 **OpenAI 兼容接口**（`/chat/completions` 或 `/images/generations`）就能直接用。

## 💡 使用技巧

**1. 世界观怎么写得让 AI 更听话**

世界观和剧本设定里可以写「硬性要求」，AI 会每次执行，例如：

```
时代背景：唐朝开元盛世，长安城人口百万。
社会规则：女子不得夜里独自上街，宵禁后坊门关闭。

【必须遵守】
- 每次回复都要写出在场每个人的心理活动
- 每次回复结尾描写一段环境氛围
- 对话要符合唐代口语习惯，不要用现代词汇
```

**2. 世界观写太长怎么办**

把核心设定留在「世界观详情」里，大量细节拆成「世界书」条目。这样只有对话提到时才注入，省 token 又精准。

**3. 多回复候选怎么用**

对某个回复不满意就点「↻ 重新生成」，旧回复会保留。用 `◀ 2/3 ▶` 来回对比，切换后继续对话时，模型看到的也是你当前选中的那版。

## 📁 项目结构

```
chatbot-app/
├── build.js                    # 构建脚本：生成 HTML（含 JSX 源码 + Supabase 配置）
├── transform.js                # Babel 编译脚本：JSX → 纯 JS
├── supabase-complete.sql       # ⭐ 完整建表脚本（部署必跑，含全部表和字段）
├── .github/workflows/
│   └── deploy-pages.yml        # GitHub Actions 自动部署
├── github-pages/               # 构建产物目录
│   └── index.html              # 最终部署的单文件应用
├── deploy/                     # 构建产物副本
├── supabase-worldview-details-migrate.sql  # 历史增量（已被 complete 合并）
├── supabase-lorebook-variants-migrate.sql  # 历史增量（已被 complete 合并）
├── supabase-schema.sql         # 旧版建表脚本（保留）
├── supabase-migrate.sql        # 旧版增量脚本（保留）
├── supabase-image-migrate.sql  # 旧版生图迁移脚本（保留）
├── client/                     # 早期前端脚手架（已废弃）
└── server/                     # 早期后端脚手架（已废弃）
```

## 📊 数据库表

| 表 | 用途 |
|----|------|
| `worldviews` | 世界观（自由文本 `details`） |
| `bots` | 角色（含讲话风格、自定义头像、聊天背景） |
| `messages` | 单聊消息（含多回复候选 `variants`） |
| `user_settings` | 用户 API 配置与个人信息 |
| `stories` | 剧本 |
| `story_characters` | 剧本 ↔ 角色关联 |
| `story_messages` | 剧本消息（含多回复候选 `variants`） |
| `lorebook_entries` | 世界书条目（关键词触发） |

所有表均开启 **RLS**，策略为 `auth.uid() = user_id`，用户之间数据完全隔离。

## ⚠️ 注意事项

1. **API Key 安全**：所有配置存在你自己的 Supabase（RLS 保护）和浏览器本地，不上传第三方。建议不要与他人共用账号。
2. **行级安全**：`supabase-complete.sql` 已为所有表开启 RLS，务必**不要关闭**，否则别人可能读到你的数据。
3. **生图服务**：本项目走 OpenAI 兼容格式（`/v1/images/generations`）。火山引擎注意路径是 `/api/v3`。
4. **修改后要重新构建**：改完代码需执行 `node build.js && node transform.js` 再部署。
5. **网络环境**：Supabase 服务器在海外，国内访问偶尔不稳定。项目已内置 15 秒请求超时，超时会提示重试而不会卡死。

## 📄 License

MIT License —— 可自由使用、修改、分发。
