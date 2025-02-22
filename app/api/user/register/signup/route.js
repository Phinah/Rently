import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { passwordEncryptor } from "@/util/password";

const prisma = new PrismaClient();

export async function POST(request) {
  const [error, setError] = useState(null);

  try {
    const { firstName, lastName, email, password } = await request.json();
    const hashedPassword = await passwordEncryptor(password);

    if (!email || !firstName || !lastName || !password) {
      return NextResponse.json(
        { message: "Please, fill all fields on the form" },
        { status: 400 }
      );
    }

    await prisma.$connect();

  console.log('====================================');
console.log(error);
console.log('====================================');
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists != null) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      };

      const user = await prisma.user.create({
        data: userData,
      });

      if (user) {
        return NextResponse.json(
          { message: "User created successfully", data: user },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  
}

}