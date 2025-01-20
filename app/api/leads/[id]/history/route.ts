import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = parseInt(params.id, 10);
    const history = await prisma.leadHistory.findMany({
      where: { leadId },
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error("Error fetching lead history:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching lead history",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = parseInt(params.id, 10);
    const { action, notes, createdBy } = await request.json();

    const newHistoryEntry = await prisma.leadHistory.create({
      data: {
        leadId,
        action,
        notes,
        createdBy,
      },
    });

    // Update the lead status
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: "Contacted" },
    });

    return NextResponse.json({ success: true, historyEntry: newHistoryEntry });
  } catch (error) {
    console.error("Error creating lead history entry:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while creating lead history entry",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
