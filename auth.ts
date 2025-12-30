import NextAuth from "next-auth";
import authConfig from "./auth.config";

// 自动导出 signIn（登录触发）、signOut（登出触发）、auth（会话校验）方法，无需手动编写登出时销毁 Token/Cookie、
// 会话有效性校验等逻辑。
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true, // 允许多个主机（开发环境必需）
  pages: {
    signIn: "/login",
    error: "/login", // 将错误页面也重定向到登录页
  },
  session: {
    strategy: "jwt", // 自动生成 JWT 令牌、自动设置 HttpOnly Cookie 存储 Token、自动处理 Token 过期与刷新
    maxAge: 30 * 24 * 60 * 60, // 默认30天过期
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // OAuth 登录时自动创建用户（如果不存在）
      if (account?.provider !== "credentials") {
        // 这里可以添加 OAuth 用户的自动注册逻辑
        // 暂时允许所有 OAuth 登录通过
        return true;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development", // 开发环境启用调试日志
});
