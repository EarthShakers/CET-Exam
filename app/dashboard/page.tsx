import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { ExamList } from "@/components/exam-list"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const exams = await prisma.exam.findMany({
    where: {
      createdById: session.user.id
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      createdBy: {
        select: {
          name: true
        }
      }
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">我的考试</h2>
      </div>
      <ExamList exams={exams} />
    </div>
  )
}

