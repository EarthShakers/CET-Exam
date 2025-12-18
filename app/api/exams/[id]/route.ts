import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { examSchema } from "@/lib/validations/exam"

// GET single exam
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "未授权" },
        { status: 401 }
      )
    }

    const exam = await prisma.exam.findUnique({
      where: {
        id,
        createdById: session.user.id
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    if (!exam) {
      return NextResponse.json(
        { error: "考试不存在" },
        { status: 404 }
      )
    }

    return NextResponse.json(exam)
  } catch (error) {
    console.error("Get exam error:", error)
    return NextResponse.json(
      { error: "获取考试详情失败" },
      { status: 500 }
    )
  }
}

// PUT update exam
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "未授权" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedFields = examSchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "输入验证失败", details: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // Check if exam exists and belongs to user
    const existingExam = await prisma.exam.findUnique({
      where: {
        id,
        createdById: session.user.id
      }
    })

    if (!existingExam) {
      return NextResponse.json(
        { error: "考试不存在或无权限" },
        { status: 404 }
      )
    }

    const { title, type, description, startTime, endTime } = validatedFields.data

    const exam = await prisma.exam.update({
      where: { id },
      data: {
        title,
        type,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    return NextResponse.json(exam)
  } catch (error) {
    console.error("Update exam error:", error)
    return NextResponse.json(
      { error: "更新考试失败" },
      { status: 500 }
    )
  }
}

// DELETE exam
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    const { id } = await params

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "未授权" },
        { status: 401 }
      )
    }

    // Check if exam exists and belongs to user
    const existingExam = await prisma.exam.findUnique({
      where: {
        id,
        createdById: session.user.id
      }
    })

    if (!existingExam) {
      return NextResponse.json(
        { error: "考试不存在或无权限" },
        { status: 404 }
      )
    }

    await prisma.exam.delete({
      where: { id }
    })

    return NextResponse.json({ message: "删除成功" })
  } catch (error) {
    console.error("Delete exam error:", error)
    return NextResponse.json(
      { error: "删除考试失败" },
      { status: 500 }
    )
  }
}

