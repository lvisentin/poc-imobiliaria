import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        address: true,
        images: true,
      },
      take: 6, // Limit to 6 properties for the showcase
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json({ success: true, properties });
  } catch (error) {
    console.error("Error fetching public properties:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching properties",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
