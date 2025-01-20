import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = parseInt(params.id, 10);
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
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
    console.error("Error fetching property:", error);
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = parseInt(params.id, 10);
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const address = formData.get("address") as string;
    const existingImages = JSON.parse(formData.get("existingImages") as string);

    if (!title || !description || isNaN(price) || !address) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const images = [...existingImages];

    // Handle new image uploads
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("image") && value instanceof Blob) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const filename = `${Date.now()}-${value.name}`;
        const filepath = path.join(
          process.cwd(),
          "public",
          "uploads",
          filename
        );

        await writeFile(filepath, buffer);
        images.push(`/uploads/${filename}`);
      }
    }

    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: {
        title,
        description,
        price,
        address,
        images,
      },
    });

    return NextResponse.json({ success: true, property: updatedProperty });
  } catch (error) {
    console.error("Property update error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during property update" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = parseInt(params.id, 10);

    await prisma.property.delete({
      where: { id: propertyId },
    });

    return NextResponse.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Property deletion error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during property deletion" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
