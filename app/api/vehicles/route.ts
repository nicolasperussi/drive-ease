import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const vehicles = await prisma.car.findMany();
    return NextResponse.json({ vehicles }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Method not allowed", method: req.method },
      { status: 200 }
    );
  }
}

export { handler as GET };
