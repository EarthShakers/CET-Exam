"use client"

import Link from "next/link"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Edit, Eye, Trash2 } from "lucide-react"
import { DeleteExamDialog } from "./delete-exam-dialog"

interface Exam {
  id: string
  title: string
  type: string
  description: string | null
  startTime: Date
  endTime: Date
  createdBy: {
    name: string
  }
  createdAt: Date
}

export function ExamList({ exams }: { exams: Exam[] }) {
  if (exams.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <p className="text-gray-500 text-lg">还没有创建任何考试</p>
          <p className="text-gray-400 text-sm mt-2">点击右上角的"创建考试"按钮开始</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {exams.map((exam) => (
        <Card key={exam.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl">{exam.title}</CardTitle>
              <Badge variant={exam.type === "CET4" ? "default" : "secondary"}>
                {exam.type}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {exam.description || "暂无描述"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              开始：{format(new Date(exam.startTime), "yyyy-MM-dd HH:mm", { locale: zhCN })}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              结束：{format(new Date(exam.endTime), "yyyy-MM-dd HH:mm", { locale: zhCN })}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Link href={`/dashboard/exams/${exam.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                查看
              </Button>
            </Link>
            <Link href={`/dashboard/exams/${exam.id}/edit`}>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <DeleteExamDialog examId={exam.id} examTitle={exam.title} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

