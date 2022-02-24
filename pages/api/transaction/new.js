import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { description, amount } = JSON.parse(req.body);
  const session = await getSession({ req });
  if (session.user) {
    const result = await prisma.transaction.create({
      data: {
        description,
        amount,
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });
    res.json(result);
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
}
