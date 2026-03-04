import amqp from "amqplib";
import logger from "../utils/logger.js";

let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname: process.env.RABBITMQ_HOST,
      port: parseInt(process.env.RABBITMQ_PORT!),
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
    });
    channel = await connection.createChannel();
    logger.info(`Connected to RabbitMQ`);
  } catch (error) {
    logger.error(`Failed to connecto to RabbitMQ: ${error}`);
  }
};

export const publishToQueue = async (queueName: string, message: any) => {
  if (!channel) {
    logger.error(`RabbitMQ channel is not initialised`);
    return;
  }

  const buffer = Buffer.from(JSON.stringify(message));
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, buffer, { persistent: true });
};
