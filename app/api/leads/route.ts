import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.log("error", error)
    console.log("error", error)
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching leads" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.log("error", error)
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during lead creation" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
