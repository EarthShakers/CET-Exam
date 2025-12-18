# 🚀 快速启动指南

## 第一步：配置数据库

1. 复制环境变量模板：
```bash
cp .env.local.example .env.local
```

2. 编辑 `.env.local` 文件，填入你的 Vercel Postgres 数据库信息：
```bash
DATABASE_URL="postgres://..."
DIRECT_URL="postgres://..."
NEXTAUTH_SECRET="请运行: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

### 如何获取 Vercel Postgres 数据库 URL？

#### 方法 1：使用现有数据库
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入 Storage 标签
3. 选择你的 Postgres 数据库
4. 复制 `POSTGRES_URL` 和 `POSTGRES_URL_NON_POOLING`

#### 方法 2：创建新数据库
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 Storage → Create Database
3. 选择 Postgres
4. 按提示创建后获取连接字符串

## 第二步：初始化数据库

```bash
# 生成 Prisma Client
pnpm prisma generate

# 推送数据库模式（创建表）
pnpm prisma db push
```

成功后你会看到：
```
✔ Generated Prisma Client
✔ Database synchronized with schema
```

## 第三步：启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

## 第四步：开始使用

1. **注册账号**: 访问首页点击"注册账号"
2. **登录系统**: 使用注册的邮箱和密码登录
3. **创建考试**: 点击右上角的"创建考试"按钮
4. **管理考试**: 在列表中可以查看、编辑、删除考试

## ✅ 功能清单

- [x] 用户注册
- [x] 用户登录
- [x] 退出登录
- [x] 创建考试（标题、类型 CET4/CET6、描述、开始时间、结束时间）
- [x] 编辑考试
- [x] 删除考试（带确认对话框）
- [x] 查看考试列表
- [x] 查看考试详情
- [x] 响应式设计
- [x] 表单验证
- [x] Toast 通知

## 🎨 界面预览

- **首页**: 渐变背景 + 登录/注册入口
- **登录/注册**: 简洁的表单设计
- **Dashboard**: 卡片式考试列表
- **创建/编辑**: 直观的表单界面
- **详情页**: 完整的考试信息展示

## 🔧 常见问题

### Q: 数据库连接失败？
A: 检查 `.env.local` 中的 `DATABASE_URL` 和 `DIRECT_URL` 是否正确

### Q: 登录后跳转到 404？
A: 确认已运行 `pnpm prisma db push` 创建数据库表

### Q: 页面样式错乱？
A: 重启开发服务器：`Ctrl+C` 然后 `pnpm dev`

### Q: Prisma Client 错误？
A: 重新生成客户端：`pnpm prisma generate`

## 📦 技术栈

- Next.js 16 (App Router)
- Vercel Postgres + Prisma
- NextAuth.js v5
- Shadcn UI + Tailwind CSS
- React Hook Form + Zod
- Lucide React (图标)
- Sonner (通知)

## 🚢 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量（与 `.env.local` 相同）
4. 点击 Deploy

## 📞 需要帮助？

查看完整文档：[SETUP.md](./SETUP.md)

---

**祝你使用愉快！** 🎉

