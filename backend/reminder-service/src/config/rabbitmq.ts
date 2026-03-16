import amqp from "amqplib";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

let channel: amqp.Channel | null = null;

const RABBITMQ_CONFIG = {
  protocol: "amqp",
  hostname: process.env.RABBITMQ_HOST,
  port: parseInt(process.env.RABBITMQ_PORT!),
  username: process.env.RABBITMQ_USER,
  password: process.env.RABBITMQ_PASSWORD,
};

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_CONFIG);
    channel = await connection.createChannel();
    logger.info(`RabbitMQ: Connected to RabbitMQ`);
  } catch (error) {
    logger.error(`RabbitMQ: Connection failed: ${error}`);
  }
};

export const publishToQueue = async (queueName: string, message: any) => {
  if (!channel) {
    logger.error(`RabbitMQ channel is not initialised`);
    return;
  }
  await channel.assertQueue(queueName, { durable: true });

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};
