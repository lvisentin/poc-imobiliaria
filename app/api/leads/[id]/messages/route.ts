import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
   { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const leadId = parseInt(id, 10);
    const messages = await prisma.message.findMany({
      where: { leadId },
      orderBy: { timestamp: "asc" },
    });
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.log("error", error)
    console.error("Error fetching lead messages:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching lead messages",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(
  request: Request,
   { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const leadId = parseInt(id, 10);
    const { content, sender } = await request.json();

    const newMessage = await prisma.message.create({
      data: {
        leadId,
        content,
        sender,
      },
    });

    // Update the lead status
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: "Contacted" },
    });

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.log("error", error)
    console.error("Error creating message:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while creating message" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
