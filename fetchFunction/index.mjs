// const AWS = require('aws-sdk');
import AWS from 'aws-sdk';

export const handler = async (event) => {
  
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const fetchTable = { TableName: 'tasks',};
  const data = await dynamoDB.scan(fetchTable).promise();
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(data.Items),
  };
  
  return response;
};