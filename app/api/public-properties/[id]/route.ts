import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
   { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const propertyId = parseInt(id, 10);
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        address: true,
        images: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.log("error", error)
    console.error("Error fetching public property:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching the property",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
