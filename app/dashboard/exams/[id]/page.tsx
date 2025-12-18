import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Edit, User } from "lucide-react"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { DeleteExamDialog } from "@/components/delete-exam-dialog"

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  const { id } = await params

  if (!session?.user?.id) {
    redirect("/login")
  }

  const exam = await prisma.exam.findUnique({
    where: {
      id,
      createdById: session.user.id
    },
    include: {
      createdBy: {
        select: {
          name: true,
          email: true,
        }
      }
    }
  })

  if (!exam) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回列表
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/dashboard/exams/${exam.id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              编辑
            </Button>
          </Link>
          <DeleteExamDialog examId={exam.id} examTitle={exam.title} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl">{exam.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={exam.type === "CET4" ? "default" : "secondary"}>
                  {exam.type}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {exam.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">考试描述</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{exam.description}</p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">时间信息</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">开始时间：</span>
                  {format(new Date(exam.startTime), "yyyy年MM月dd日 HH:mm", { locale: zhCN })}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">结束时间：</span>
                  {format(new Date(exam.endTime), "yyyy年MM月dd日 HH:mm", { locale: zhCN })}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">创建信息</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">创建人：</span>
                  {exam.createdBy.name}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium mr-2">创建时间：</span>
                  {format(new Date(exam.createdAt), "yyyy年MM月dd日 HH:mm", { locale: zhCN })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

