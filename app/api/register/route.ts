import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    data: { email, password, vorname, nachname },
  } = await req.json();

  const hashed = await hash(password, 12);

  const API_KEY = process.env.MAILGUN_API_KEY || "";
  const DOMAIN = process.env.MAILGUN_DOMAIN || "";

  const user = await prismadb.user.create({
    data: {
      email,
      password: hashed,
    },
  });

  const token = await prismadb.activateToken.create({
    data: {
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      userId: user.id,
    },
  });

  // const mailgun = new Mailgun(formData);

  // const client = mailgun.client({ username: "api", key: API_KEY });

  // const messageData = {
  //   from:`Example email <hello${DOMAIN}>`,
  //   to:user.email,
  //   subject:'Please Activate Your Account',
  //   text:`Hello ${user.name}, please activate your account by clicking this link: http://localhost:3000/activate/${token.token}`,
  // }

  // await client.messages.create(DOMAIN,messageData)
  


  return NextResponse.json({
    user: {
      email: user.email,
    },
  });
}
