import express from "express";
import { checkPayment, createInvoice, webhook } from "../controller/users/qpay.controller.js";

const router = express.Router();

router.post("/create", createInvoice);   // Create invoice and return QR
router.post("/check", checkPayment);    // Check status manually (optional)
router.post("/webhook", webhook);       // QPay webhook for automatic update

export const qpayRouter = router;
