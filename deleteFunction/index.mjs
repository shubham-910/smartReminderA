import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  let taskId;
  
  try {
    const eventBody = JSON.parse(event.body);
    const pathParameters = eventBody.pathParameters || event.pathParameters || {};
    taskId = pathParameters.taskId;
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request structure', error: error.message }),
    };
  }

  if (!taskId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Task ID is required' }),
    };
  }

  // Convert taskId to a number
  const stringToNumberTaskid = Number(taskId);

  if (isNaN(stringToNumberTaskid)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Task ID must be a number' }),
    };
  }

  const dataToDelete = {
    TableName: 'tasks',
    Key: {
      taskId: stringToNumberTaskid,
    },
  };

  try {
    await dynamoDB.delete(dataToDelete).promise();
    return {
      statusCode: 200,
      body: JSON.stringify("Task deleted Successfully."),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to delete task', error: error.message }),
    };
  }
};
