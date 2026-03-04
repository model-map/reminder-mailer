import amqp from "amqplib";
import nodemailer, { Transport, Transporter } from "nodemailer";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

const RABBITMQ_URL = {
  protocol: "amqp",
  hostname: process.env.RABBITMQ_HOST,
  port: parseInt(process.env.RABBITMQ_PORT!),
  username: process.env.RABBITMQ_USER,
  password: process.env.RABBITMQ_PASSWORD,
};

export const startSendVerificationMailConsumer = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    const queueName = "send-verification-mail";
    await channel.assertQueue(queueName, { durable: true });
    logger.info(
      `RabbitMQ: verification-mail consumer started. Listening for Verification mails`,
    );

    channel.consume(queueName, async (msg) => {
      if (msg) {
        try {
          const { to, subject, body } = JSON.parse(msg.content.toString());

          const transporter: Transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.MAILER_USER,
              pass: process.env.MAILER_PASSWORD,
            },
          });

          // Send mail
          await transporter.sendMail({
            from: "Reminder Mailer",
            to,
            subject,
            text: body,
          });

          logger.info(`Verification mail sent to ${to}`);
          channel.ack(msg);
        } catch (error) {
          logger.error(`Failed to send OTP - ${error}`);
          channel.nack(msg);
        }
      }
    });
  } catch (error) {
    logger.error(`Failed to start RabbitMQ consumer: ${error}`);
  }
};
