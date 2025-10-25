import axios from "axios";
import dotenv from "dotenv";
import { Payment } from "../../modules/payment.js";

dotenv.config();

const QPAY_BASE_URL = process.env.QPAY_BASE_URL;

// ✅ Step 1: Get Access Token
async function getAccessToken() {
  const res = await axios.post(
    `${QPAY_BASE_URL}/auth/token`,
    {
      username: process.env.QPAY_USERNAME,
      password: process.env.QPAY_PASSWORD,
    },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data.access_token;
}

// ✅ Step 2: Create Invoice
export const createInvoice = async (req, res) => {
  try {
    const { order_id, amount } = req.body;
    const token = await getAccessToken();

    const invoiceRes = await axios.post(
      `${QPAY_BASE_URL}/invoice`,
      {
        invoice_code: "DELIVERY_APP_INVOICE", // from QPay email
        sender_invoice_no: order_id,
        invoice_description: `Payment for order ${order_id}`,
        amount,
        callback_url: `${process.env.BACKEND_URL}/qpay/webhook`,
        sender_staff_code: "system",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Save payment in MongoDB
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

// ✅ Step 3: Check Payment
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

// ✅ Step 4: Webhook for auto update
export const webhook = async (req, res) => {
  console.log("💰 QPay webhook received:", req.body);
  const { object_id, payment_status } = req.body;

  if (payment_status === "PAID") {
    await Payment.findOneAndUpdate({ invoice_id: object_id }, { status: "PAID" });
  }

  res.json({ received: true });
};
