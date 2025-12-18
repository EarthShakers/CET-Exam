import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            CET 考试系统
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            专业的 CET 四六级考试管理平台
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button size="lg">
              登录
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline">
              注册账号
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
