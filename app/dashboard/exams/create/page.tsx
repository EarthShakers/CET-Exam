import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExamForm } from "@/components/exam-form"

export default function CreateExamPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>创建新考试</CardTitle>
          <CardDescription>
            填写以下信息创建一个新的考试
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExamForm mode="create" />
        </CardContent>
      </Card>
    </div>
  )
}

