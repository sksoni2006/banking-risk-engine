import { Router } from "express";
import { prisma } from "../utils/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const customers = await prisma.customer.findMany({
    include: { accounts: true, loans: true } // Show 360 view
  });
  res.json(customers);
});

router.post("/", async (req, res) => {
  const customer = await prisma.customer.create({ data: req.body });
  res.json(customer);
});

export default router;