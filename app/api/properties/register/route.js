import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();

    console.log(data);

    await prisma.$connect();

    const property = await prisma.property.create({
      data,
    });

    return NextResponse.json(
      { message: "Property registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error?.message);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
