import express from "express";
import { checkPayment, createInvoice, webhook } from "../controller/users/qpay.controller.js";

const router = express.Router();

router.post("/create", createInvoice);
router.post("/check", checkPayment);
router.post("/webhook", webhook);

export const qpayRouter = router;
