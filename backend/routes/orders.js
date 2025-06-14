const express = require("express");
const router = express.Router();
const orderService = require("../services/orderService");
const { sendEmail } = require("../utils/mail");

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

/**
 * @swagger
 * /get-order-details:
 *   get:
 *     summary: Get all order details from Excel
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/get-order-details", async (req, res) => {
  try {
    const data = await orderService.getOrderDetails();
    res.json({ success: true, message: data, status: 200 });
  } catch (e) {
    res.status(500).json({ error: "An error occurred", exception: e.message });
  }
});

router.post("/get-email-template", (req, res) => {
  const emailBody = orderService.getEmailFormat(req.body);
  res.json({ success: true, message: emailBody });
});

/**
 * @swagger
 * /send-email:
 *   post:
 *     summary: Send order details email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_number:
 *                 type: string
 *               status:
 *                 type: string
 *               error_code:
 *                 type: string
 *               error_description:
 *                 type: string
 *               resolutions:
 *                 type: string
 *               responsible_system:
 *                 type: string
 *               poc:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 */
router.post("/send-email", async (req, res) => {
  try {
    const emailBody = orderService.getEmailFormat(req.body);
    await sendEmail(req.body.poc, "Order Details", emailBody);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ error: "Failed to send email", exception: e.message });
  }
});

router.post("/api/notify", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const headers = {
    Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
    "Content-Type": "application/json",
  };

  const payload = {
    channel: SLACK_CHANNEL_ID,
    text: message,
  };

  try {
    const response = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!result.ok) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
