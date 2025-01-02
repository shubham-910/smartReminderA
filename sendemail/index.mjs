import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.USER_PASSWORD
  }
});

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const sqs = new AWS.SQS();
  const customerEmail = process.env.CUST_EMAIL; // Environment variable for the email

  for (const record of event.Records) {
    console.log('Record Body:', record.body); // Log the record body

    let message;
    try {
      message = JSON.parse(record.body);
      console.log('Parsed message:', message);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      continue; // Skip this record and move to the next one
    }

    const { taskName, taskDescription, taskDate } = message;

    const mailOptions = {
      from: 'no-reply@dal.ca',
      to: customerEmail,
      subject: 'Task Reminder',
      text: `Task Reminder: ${taskName} - ${taskDescription} will start at ${taskDate}.`
    };

    try {
      console.log('Sending email with options:', mailOptions);

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');

      // Delete the message from SQS after sending the email
      await sqs.deleteMessage({
        QueueUrl: process.env.SQS_URL,
        ReceiptHandle: record.receiptHandle
      }).promise();
      console.log('Message deleted from SQS.');
    } catch (error) {
      console.error('Error sending email or deleting message from SQS:', error);
    }
  }
};
