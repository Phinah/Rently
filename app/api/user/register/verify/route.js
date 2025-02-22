import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request) {
    try{
    const { searchParams } = new URL(request.url)
    const token =  searchParams.get("token")

    if (!token) {
        return NextResponse.json({ message: "Token is required." }, { status: 400 });
    }
    const user = await prisma.user.findFirst({
        where : {verificationToken : token}
    })
    console.log(user)
    
        if(!user) {
            return NextResponse.json({message: "Invalid or expired token"}, {status: 401})
        }

        await prisma.user.update({
            where: {id: user.id},
            data: {
                isVerified: true,
                verificationToken: null
            }
        })

        return NextResponse.json({message: "Email verified succesfully"}, {status:200})
    }catch(error){
        return NextResponse.json({message: error }, {status: 500})
    }finally{
        await prisma.$disconnect()
    }
}