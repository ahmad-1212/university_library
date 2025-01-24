import { Client as WorkFlowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "./config";

export const workFlowClient = new WorkFlowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

const template = (message: string): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        font-size: 16px;
        line-height: 1.6;
      }
      .header {
        background-color: #4caf50;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .content p {
        margin: 10px 0;
      }
      .content .message {
        background-color: #f9f9f9;
        border: 1px solid #e0e0e0;
        padding: 15px;
        border-radius: 5px;
        color: #555;
      }
      .footer {
        text-align: center;
        padding: 10px;
        background-color: #f4f4f7;
        color: #888;
        font-size: 14px;
      }
      .footer a {
        color: #4caf50;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Ahmad Ali</h1>
        <p>Your trusted service provider</p>
      </div>
      <div class="content">
        <p>Hi,</p>
        <p>We’re excited to share this message with you:</p>
        <div class="message">
          ${message}
        </div>
        <p>
          If you have any questions, feel free to reply to this email, and we’ll
          get back to you as soon as possible.
        </p>
        <p>Best regards,<br />Ahmad Ali</p>
      </div>
      <div class="footer">
        <p>
          © 2025 Ahmad Ali. All rights reserved. | <a href="#">Unsubscribe</a>
        </p>
      </div>
    </div>
  </body>
</html>

`;

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    await qstashClient.publishJSON({
      url: "https://api.mailjet.com/v3.1/send",
      body: {
        Messages: [
          {
            From: {
              Email: "ahmadali.swat333@gmail.com",
              Name: "Ahmad Ali",
            },
            To: [
              {
                Email: email,
                Name: email, // Optional: recipient's name if available
              },
            ],
            Subject: subject,
            HTMLPart: template(message), // HTML content of the email
          },
        ],
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${config.env.mailjet.apiKey}:${config.env.mailjet.secretKey}`
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Email successfully sent via QStash.");
  } catch (error) {
    console.error("Error sending email via QStash:", error);
    throw new Error("Failed to send email.");
  }
};
