import { Router, Request, Response } from "express";
import { prisma } from "../utils/prisma";

const router = Router();

// Get All Branches
router.get("/", async (req, res) => {
  try {
    const branches = await prisma.branch.findMany();
    res.json(branches);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch branches" });
  }
});

// Calculate Branch Liquidity Risk
router.get("/:id/liquidity", async (req: Request, res: Response) => {
  const branchId = parseInt(req.params.id);

  try {
    // Sum of Deposits (Liabilities)
    const deposits = await prisma.account.aggregate({
      where: { branchId },
      _sum: { balance: true }
    });

    // Sum of Loans (Assets)
    const loans = await prisma.loan.aggregate({
      where: { branchId },
      _sum: { principal: true }
    });

    const totalDeposits = Number(deposits._sum.balance) || 0;
    const totalLoans = Number(loans._sum.principal) || 0;

    // Liquidity Ratio = Loans / Deposits
    const ratio = totalDeposits === 0 ? 0 : (totalLoans / totalDeposits);

    res.json({
      branchId,
      totalDeposits,
      totalLoans,
      liquidityRatio: ratio.toFixed(2),
      status: ratio > 0.8 ? "HIGH_RISK" : "SAFE" 
    });
  } catch (error) {
    res.status(500).json({ error: "Calculation failed" });
  }
});

export default router;