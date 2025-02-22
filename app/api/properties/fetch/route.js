import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$connect();

    const properties = await prisma.property.findMany();

    return NextResponse.json({ properties }, { status: 200 });
  } catch (error) {
    console.error(error?.message);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}