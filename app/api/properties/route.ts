import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
/* eslint-disable  @typescript-eslint/no-explicit-any */

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const address = formData.get("address") as string;
    const totalArea = parseFloat(formData.get("totalArea") as string) || 0;
    const landArea = parseFloat(formData.get("landArea") as string) || 0;
    const bedrooms = parseInt(formData.get("bedrooms") as string) || 0;
    const bathrooms = parseInt(formData.get("bathrooms") as string) || 0;
    const hasGarage = formData.get("hasGarage") === "true";
    const isFurnished = formData.get("isFurnished") === "true";
    const userId = parseInt(formData.get("userId") as string);

    if (!title || !description || isNaN(price) || !address || isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const images: string[] = [];

    // Handle image uploads
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

    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        price,
        address,
        totalArea,
        landArea,
        bedrooms,
        bathrooms,
        hasGarage,
        isFurnished,
        images,
        userId,
      },
    });

    return NextResponse.json({ success: true, property: newProperty });
  } catch (error) {
    console.log("error", error);
    console.error("Property registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during property registration",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const propertyType = searchParams.get("propertyType");
    const area = searchParams.get("area");

    const whereClause: any = {};

    if (minPrice)
      whereClause.price = { ...whereClause.price, gte: parseFloat(minPrice) };
    if (maxPrice)
      whereClause.price = { ...whereClause.price, lte: parseFloat(maxPrice) };
    if (bedrooms) whereClause.bedrooms = { gte: parseInt(bedrooms) };
    if (propertyType) whereClause.propertyType = propertyType;
    if (area) whereClause.totalArea = { gte: parseFloat(area) };

    const properties = await prisma.property.findMany({
      where: whereClause,
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ success: true, properties });
  } catch (error) {
    console.log("error", error);
    console.error("Error fetching properties:", error);
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
