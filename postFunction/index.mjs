import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    const eventBody = JSON.parse(event.body);
    const { taskName, taskDescription, taskDate } = eventBody;

    if (!taskName || !taskDescription || !taskDate) {
      console.log('Invalid request body:', eventBody);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request body. Missing required fields.' })
      };
    }

    const dataToStore = {
      TableName: 'tasks',
      Item: {
        taskId: Date.now(),
        taskName,
        taskDescription,
        taskDate
      }
    };

    console.log('Data to store:', dataToStore);

    await dynamoDB.put(dataToStore).promise();

    const message = {
      taskName,
      taskDescription,
      taskDate
    };

    const params = {
      Message: JSON.stringify(message),
      Subject: 'Task Reminder',
      TopicArn: process.env.SNS_ARN
    };

    console.log('SNS publish params:', params);

    await sns.publish(params).promise();

    console.log('Task added successfully and SNS message sent.');

    return {
      statusCode: 200,
      body: JSON.stringify("Task added Successfully."),
    };
  } catch (error) {
    console.error('Error adding task:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};
