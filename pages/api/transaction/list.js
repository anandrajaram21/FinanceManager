import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const results = await prisma.transaction.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
  });
  res.json(results);
}
