import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()

  if (!body) {
    return NextResponse.json({ success: false, message: 'Empty request body' }, { status: 400 })
  }

  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ success: true, user: { id: newUser.id, email: newUser.email } })
  } catch (error) {
    console.log("error", error)
    console.error('Registration error:', error)
    return NextResponse.json({ success: false, message: 'An error occurred during registration', error: 'erro' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

