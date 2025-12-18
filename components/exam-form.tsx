"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { examSchema, type ExamInput } from "@/lib/validations/exam"
import { useState } from "react"

interface ExamFormProps {
  mode: "create" | "edit"
  defaultValues?: ExamInput & { id?: string }
}

export function ExamForm({ mode, defaultValues }: ExamFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ExamInput>({
    resolver: zodResolver(examSchema),
    defaultValues: defaultValues || {
      title: "",
      type: "CET4",
      description: "",
      startTime: "",
      endTime: "",
    },
  })

  async function onSubmit(data: ExamInput) {
    setIsLoading(true)

    try {
      const url = mode === "create" 
        ? "/api/exams" 
        : `/api/exams/${defaultValues?.id}`
        
      const method = mode === "create" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "操作失败")
      }

      toast.success(mode === "create" ? "创建成功" : "更新成功")
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      toast.error(mode === "create" ? "创建失败" : "更新失败", {
        description: error instanceof Error ? error.message : "发生未知错误",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>考试标题</FormLabel>
              <FormControl>
                <Input placeholder="例如：2024年12月CET-4考试" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>考试类型</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择考试类型" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CET4">CET-4（四级）</SelectItem>
                  <SelectItem value="CET6">CET-6（六级）</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>考试描述</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="输入考试的相关描述..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                可选，描述考试的相关信息
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>开始时间</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>结束时间</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            取消
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading 
              ? (mode === "create" ? "创建中..." : "保存中...") 
              : (mode === "create" ? "创建考试" : "保存更改")}
          </Button>
        </div>
      </form>
    </Form>
  )
}

