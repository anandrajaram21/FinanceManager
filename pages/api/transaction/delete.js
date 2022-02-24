import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = JSON.parse(req.body);
  const session = await getSession({ req });
  if (session.user) {
    const result = await prisma.transaction.delete({
      where: {
        id,
      },
    });
    res.json(result);
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
}
