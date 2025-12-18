# CET 考试系统 - 部署指南

## 🚀 快速开始

### 1. 环境配置

创建 `.env.local` 文件并配置以下环境变量：

```bash
# 数据库配置（Vercel Postgres）
DATABASE_URL="your_vercel_postgres_database_url"
DIRECT_URL="your_vercel_postgres_direct_url"

# NextAuth 配置
NEXTAUTH_SECRET="your_nextauth_secret_here"  # 生成方式：openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
```

### 2. 数据库初始化

运行以下命令初始化数据库：

```bash
# 生成 Prisma Client
pnpm prisma generate

# 推送数据库模式
pnpm prisma db push

# （可选）查看数据库
pnpm prisma studio
```

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

## 📦 技术栈

- **框架**: Next.js 16 (App Router)
- **数据库**: Vercel Postgres + Prisma ORM
- **认证**: NextAuth.js v5
- **UI 组件**: Shadcn UI + Tailwind CSS
- **表单验证**: React Hook Form + Zod
- **图标**: Lucide React
- **通知**: Sonner

## 📁 项目结构

```
CET-Exam/
├── app/
│   ├── (auth)/           # 认证相关页面
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/        # 仪表板和考试管理
│   │   ├── exams/
│   │   │   ├── create/
│   │   │   └── [id]/
│   │   │       ├── edit/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/              # API 路由
│   │   ├── auth/
│   │   └── exams/
│   ├── layout.tsx
│   └── page.tsx
├── components/           # UI 组件
│   ├── ui/              # Shadcn UI 组件
│   ├── exam-list.tsx
│   ├── exam-form.tsx
│   └── delete-exam-dialog.tsx
├── lib/
│   ├── prisma.ts        # Prisma 客户端
│   └── validations/     # Zod 验证模式
│       ├── auth.ts
│       └── exam.ts
├── prisma/
│   └── schema.prisma    # 数据库模式
├── auth.config.ts       # NextAuth 配置
├── auth.ts              # NextAuth 实例
└── middleware.ts        # 路由中间件
```

## 🔑 主要功能

### 用户管理
- ✅ 用户注册（邮箱 + 密码）
- ✅ 用户登录
- ✅ 会话管理（JWT）
- ✅ 路由保护

### 考试管理
- ✅ 创建考试（标题、类型、描述、时间）
- ✅ 编辑考试
- ✅ 删除考试（带确认对话框）
- ✅ 查看考试列表
- ✅ 查看考试详情

### UI/UX
- ✅ 响应式设计
- ✅ 表单验证
- ✅ 加载状态
- ✅ Toast 通知
- ✅ 确认对话框

## 🔒 权限说明

当前 MVP 版本：
- 所有用户权限相同
- 用户只能看到自己创建的考试
- 每个考试都关联到创建者

## 🚢 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量（与 `.env.local` 相同）
4. Vercel 会自动检测到 Next.js 并部署

## 🛠️ 常用命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 启动生产服务器
pnpm start

# 数据库相关
pnpm prisma generate    # 生成 Prisma Client
pnpm prisma db push     # 推送数据库模式
pnpm prisma studio      # 打开数据库管理界面
pnpm prisma db pull     # 从数据库拉取模式
pnpm prisma migrate dev # 创建迁移（生产环境推荐）
```

## 📝 注意事项

1. **首次运行前必须配置 `.env.local` 文件**
2. **NEXTAUTH_SECRET 必须是随机生成的强密码**
3. **生产环境请使用 Prisma Migrate 而非 db push**
4. **确保 Vercel Postgres 数据库已创建**

## 🐛 问题排查

### 数据库连接失败
- 检查 `DATABASE_URL` 和 `DIRECT_URL` 是否正确
- 确认 Vercel Postgres 数据库已创建并运行

### NextAuth 错误
- 确认 `NEXTAUTH_SECRET` 已配置
- 生产环境需要配置正确的 `NEXTAUTH_URL`

### Prisma Client 错误
- 运行 `pnpm prisma generate` 重新生成客户端
- 确认数据库模式已推送：`pnpm prisma db push`

## 📞 获取帮助

如有问题，请检查：
1. 环境变量配置是否正确
2. 数据库连接是否正常
3. 依赖是否完整安装
4. Node.js 版本（推荐 v20+）

---

**祝你使用愉快！** 🎉

