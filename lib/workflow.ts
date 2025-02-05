import { Client as WorkFlowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "./config";
import { emailTemplate } from "./utils";

export const workFlowClient = new WorkFlowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  template,
}: {
  email: string;
  subject: string;
  template: string;
}) => {
  try {
    console.log("Email Sent");
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
            HTMLPart: template, // HTML content of the email
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
