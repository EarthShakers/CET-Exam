import NextAuth from "next-auth";
import authConfig from "./auth.config";

// 自动导出 signIn（登录触发）、signOut（登出触发）、auth（会话校验）方法，无需手动编写登出时销毁 Token/Cookie、
// 会话有效性校验等逻辑。
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // 自动生成 JWT 令牌、自动设置 HttpOnly Cookie 存储 Token、自动处理 Token 过期与刷新
    maxAge: 30 * 24 * 60 * 60, // 默认30天过期
  },
  callbacks: {
    async jwt({ token, user }) {
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
});
