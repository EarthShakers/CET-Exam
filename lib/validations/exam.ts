import { z } from "zod"

export const examSchema = z.object({
  title: z.string().min(1, "考试标题不能为空").max(200, "考试标题最多200个字符"),
  type: z.enum(["CET4", "CET6"], {
    required_error: "请选择考试类型",
  }),
  description: z.string().max(5000, "描述最多5000个字符").optional(),
  startTime: z.string().min(1, "请选择开始时间"),
  endTime: z.string().min(1, "请选择结束时间"),
}).refine((data) => {
  const start = new Date(data.startTime)
  const end = new Date(data.endTime)
  return end > start
}, {
  message: "结束时间必须晚于开始时间",
  path: ["endTime"],
})

export type ExamInput = z.infer<typeof examSchema>

