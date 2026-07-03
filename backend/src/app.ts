import express, { Application, Request, Response } from "express";
import cors from "cors";

import discussionRoutes from "./routes/discussionRoutes";
import replyRoutes from "./routes/replyRoutes";
import faqRoutes from "./routes/faqRoutes";
import adminRoutes from "./routes/adminRoutes";
import escalationRoutes from "./routes/escalationRoutes";
import queryResolutionRoutes from "./routes/queryResolutionRoutes";
import { notFound, errorHandler } from "./middleware/errorHandler";

const app: Application = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ success: true, message: "CSFAQ API is running" });
});

// Discussion Forum module — fully implemented per PRODUCT.md
app.use("/api/discussions", discussionRoutes);
app.use("/api/replies", replyRoutes);

// Sibling modules — placeholders only, built out in their own workstreams
app.use("/api/faq", faqRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/escalations", escalationRoutes);
app.use("/api/query-resolution", queryResolutionRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
