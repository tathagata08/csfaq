import { Router, Request, Response } from "express";

// PLACEHOLDER MODULE
// The Escalation Page is a separate module. Per PRODUCT.md, "If a discussion
// remains unresolved after community participation, the user may choose to
// create an escalation request." This router is the integration point the
// Discussion Forum's "Create Escalation" action will call once that module
// exists; it is not automatic.

const router = Router();

router.post("/", (req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message:
      "Escalation module not implemented yet. This endpoint will accept escalation requests created from an unresolved discussion.",
  });
});

router.get("/", (req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: "Escalation module not implemented yet. Placeholder endpoint.",
  });
});

export default router;
