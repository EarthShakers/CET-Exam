# CET-Exam

## 开发人员：

- 使用 next-devtools-mcp 配合 agent 开发

```
// mcp配置
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools-mcp@latest"]
    }
  }
}
```

## 项目描述

该项目需要实现一个 CET 四六级考试系统，需要实现的功能包括：

1. 用户登录与注册 （包含用户注册页面、登录页面）
2. 考试的增删改查 （支持新建考试、编辑考试参数、修改考试参数、查询考试详情）

## 技术架构

- 使用 Next.js 全栈实现前后端全部功能

## 技术栈

- Next.js
- 数据库使用 Vercel Postgres
- orm 使用 Prisma
- tailwindcss
- UI 组件库：Shadcn UI
- 图标库：Lucide React。
- 表单处理：React Hook Form + Zod
- 认证鉴权：Auth.js (NextAuth.js)
- 状态反馈：Sonner
- pnpm 包管理

- 其他可以使用 Next.js 生态比较流行的包

## 配置

- 数据库密钥、apikey 在 .env.local

## 部署

使用 Vercel 一键部署
