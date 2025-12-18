import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { examSchema } from "@/lib/validations/exam"

// GET all exams
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "未授权" },
        { status: 401 }
      )
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
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    return NextResponse.json(exams)
  } catch (error) {
    console.error("Get exams error:", error)
    return NextResponse.json(
      { error: "获取考试列表失败" },
      { status: 500 }
    )
  }
}

// POST create new exam
export async function POST(req: Request) {
  try {
    const session = await auth()

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

    const { title, type, description, startTime, endTime } = validatedFields.data

    const exam = await prisma.exam.create({
      data: {
        title,
        type,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        createdById: session.user.id,
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

    return NextResponse.json(exam, { status: 201 })
  } catch (error) {
    console.error("Create exam error:", error)
    return NextResponse.json(
      { error: "创建考试失败" },
      { status: 500 }
    )
  }
}

