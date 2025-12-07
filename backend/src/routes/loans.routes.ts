import { Router } from "express";
import { prisma } from "../utils/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const loans = await prisma.loan.findMany({
    include: { payments: true }
  });
  res.json(loans);
});

router.post("/", async (req, res) => {
  // Ensure dates are parsed correctly
  const data = {
    ...req.body,
    startDate: new Date(req.body.startDate)
  };
  const loan = await prisma.loan.create({ data });
  res.json(loan);
});

export default router;