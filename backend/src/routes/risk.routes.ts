import { Router } from "express";
import { prisma } from "../utils/prisma";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

const router = Router();

// 1. GET ALL ALERTS

router.get("/", async (req, res) => {
  try {
    const alerts = await prisma.riskAlert.findMany({
      orderBy: { createdAt: 'desc' },
      include: { branch: true, loan: true } 
    });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

// 2. SYNC CSV FROM C++ ENGINE
router.post("/sync", async (req, res) => {
  const csvPath = path.join(process.cwd(), "data", "risk_alerts.csv");
  
  if (!fs.existsSync(csvPath)) {
    return res.status(404).json({ error: "C++ output file not found. Ensure C++ engine has run." });
  }

  const results: any[] = [];

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        let count = 0;

        // --- SAFE PARSING HELPER ---
        // Converts "0", "", or "NaN" into null so DB doesn't crash
        const parseId = (val: string | undefined) => {
            if (!val || val.trim() === "") return null;
            const parsed = parseInt(val);
            // If ID is 0 (Demo Data) or Invalid, return null
            return (isNaN(parsed) || parsed === 0) ? null : parsed;
        };

        for (const row of results) {
          // Parse IDs safely
          const bId = parseId(row.branch_id);
          const lId = parseId(row.loan_id);
          const cId = parseId(row.customer_id);

          await prisma.riskAlert.create({
            data: {
              alertType: row.alert_type,
              details: row.details,
              branchId: bId, 
              loanId: lId,
              customerId: cId,
              createdAt: row.created_at ? new Date(row.created_at) : new Date()
            }
          });
          count++;
        }
        res.json({ message: "Sync successful", imported: count });
      } catch (e) {
        console.error("Sync Error:", e);
        res.status(500).json({ error: "Database import failed" });
      }
    });
});

export default router;