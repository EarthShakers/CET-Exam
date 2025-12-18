"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      // 先调用 signOut 清除会话，但不让它重定向
      await signOut({ redirect: false });
      // 手动跳转到登录页
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      // 如果出错，强制刷新跳转
      window.location.href = "/login";
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      <LogOut className="h-4 w-4 mr-2" />
      {isLoading ? "退出中..." : "退出"}
    </Button>
  );
}

