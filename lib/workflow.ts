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

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    url: "https://api.mailjet.com/v3.1/send",
    body: {
      from: "hello.ahmad@gmail.com",
      to: [email],
      subject,
      message,
    },
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${config.env.mailjet.apiKey}:${config.env.mailjet.secretKey}`
      ).toString("base64")}`,
      "Content-Type": "application/json",
    },
  });
};
