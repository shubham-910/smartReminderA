import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  
   const eventBody = JSON.parse(event.body);
   
   const { taskId } = eventBody.pathParameters;

   const stringToNumberTaskid = taskId;
   
   const dataToDelete = {
      TableName: 'tasks',
      Key: {
        taskId: stringToNumberTaskid
      }
    };
   
   await dynamoDB.delete(dataToDelete).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify("Task deleted Successfully."),
  };
  
  return response;
};