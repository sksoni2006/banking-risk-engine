import express from "express";
import cors from "cors";
import branchesRouter from "./routes/branches.routes";
import customersRouter from "./routes/customers.routes";
import accountsRouter from "./routes/accounts.routes";
import loansRouter from "./routes/loans.routes";
import riskRouter from "./routes/risk.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Mount Routes
app.use("/api/branches", branchesRouter);
app.use("/api/customers", customersRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/loans", loansRouter);
app.use("/api/risk", riskRouter);

app.get("/", (req, res) => {
  res.send("Banking Risk Engine Backend is Running 🚀");
});

export default app;