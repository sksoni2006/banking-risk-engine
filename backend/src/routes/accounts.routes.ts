import { Router } from "express";
import { prisma } from "../utils/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const accounts = await prisma.account.findMany();
  res.json(accounts);
});

router.post("/", async (req, res) => {
  const account = await prisma.account.create({ data: req.body });
  res.json(account);
});

export default router;