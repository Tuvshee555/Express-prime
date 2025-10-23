import axios from "axios";
import base64 from "base-64";
import dotenv from "dotenv";
import { Payment } from "../../modules/payment.js";

dotenv.config();

const CLIENT_ID = process.env.QPAY_CLIENT_ID;
const CLIENT_SECRET = process.env.QPAY_CLIENT_SECRET;
const QPAY_BASE_URL = "https://merchant-sandbox.qpay.mn/v2"; // sandbox

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ QPay credentials missing!");
}

// Get access token
async function getAccessToken() {
  const authHeader = "Basic " + base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const res = await axios.post(`${QPAY_BASE_URL}/auth/token`, {}, {
    headers: { Authorization: authHeader },
  });
  return res.data.access_token;
}

// Create invoice
export const createInvoice = async (req, res) => {
  try {
    const { order_id, amount } = req.body;
    const token = await getAccessToken();

    const invoiceRes = await axios.post(
      `${QPAY_BASE_URL}/invoice`,
      {
        invoice_code: `ORDER_${Date.now()}`,
        sender_invoice_no: order_id,
        invoice_description: `Payment for order ${order_id}`,
        amount,
        callback_url: `${process.env.BACKEND_URL}/qpay/webhook`,
        sender_staff_code: "system",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const payment = await Payment.create({
      invoice_id: invoiceRes.data.invoice_id,
      order_id,
      amount,
      status: "PENDING",
    });

    res.json({
      qr_image: invoiceRes.data.qr_image,
      qr_text: invoiceRes.data.qr_text,
      invoice_id: invoiceRes.data.invoice_id,
      payment,
    });
  } catch (err) {
    console.error("Create invoice error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create invoice" });
  }
};

// Check payment
export const checkPayment = async (req, res) => {
  try {
    const { invoice_id } = req.body;
    const token = await getAccessToken();

    const statusRes = await axios.post(
      `${QPAY_BASE_URL}/payment/check`,
      { object_type: "INVOICE", object_id: invoice_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const paid = statusRes.data.paid_amount > 0;
    if (paid) {
      await Payment.findOneAndUpdate({ invoice_id }, { status: "PAID" });
    }

    res.json({ paid, data: statusRes.data });
  } catch (err) {
    console.error("Check payment error:", err.response?.data || err.message);
    res.status(500).json({ error: "Check payment failed" });
  }
};

// Webhook
export const webhook = async (req, res) => {
  console.log("💰 QPay webhook received:", req.body);
  const { object_id, payment_status } = req.body;

  if (payment_status === "PAID") {
    await Payment.findOneAndUpdate({ invoice_id: object_id }, { status: "PAID" });
  }

  res.json({ received: true });
};
