import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExamForm } from "@/components/exam-form"
import { format } from "date-fns"

export default async function EditExamPage({
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
    }
  })

  if (!exam) {
    notFound()
  }

  // Format dates for datetime-local input
  const defaultValues = {
    id: exam.id,
    title: exam.title,
    type: exam.type as "CET4" | "CET6",
    description: exam.description || "",
    startTime: format(new Date(exam.startTime), "yyyy-MM-dd'T'HH:mm"),
    endTime: format(new Date(exam.endTime), "yyyy-MM-dd'T'HH:mm"),
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>编辑考试</CardTitle>
          <CardDescription>
            修改考试信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExamForm mode="edit" defaultValues={defaultValues} />
        </CardContent>
      </Card>
    </div>
  )
}

