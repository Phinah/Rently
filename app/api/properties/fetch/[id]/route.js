import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get one by id

export async function GET(request, { params }) {
  try {
    await prisma.$connect();

    const userId = (await params).id;

    const property = await prisma.property.findUnique({
      where: {
        id: userId,
      },
    });

    property.owner = await prisma.user.findUnique({
      where: {
        id: property.userId,
      },
    });

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error(error?.message);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
