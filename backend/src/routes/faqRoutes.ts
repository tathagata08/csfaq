import { Router, Request, Response } from "express";

// PLACEHOLDER MODULE
// The FAQ Page is a separate module in the CSFAQ project and is owned by
// another workstream. These routes exist only so the Discussion Forum's
// "Promote to FAQ" integration point has something to call, and so the
// overall API surface (and frontend nav) is wired up end-to-end.
// Replace with the real FAQ implementation when that module is built.

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: "FAQ module not implemented yet. Placeholder endpoint.",
  });
});

router.post("/", (req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message:
      "FAQ module not implemented yet. This endpoint will accept discussions promoted from the forum.",
  });
});

export default router;
