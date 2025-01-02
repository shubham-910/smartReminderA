import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

export const handler = async (event) => {
  
   const eventBody = JSON.parse(event.body);
   const taskName = eventBody.task_name;
   const taskDescription = eventBody.task_description;
   const taskDateTime = eventBody.date_time;
   
   if (!taskName || !taskDescription || !taskDateTime) {
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
        taskDateTime
      }
    };
  
  const dataStore = await dynamoDB.put(dataToStore).promise();

  setTimeout(async () => {
    const message = `Task Reminder: ${taskName} - ${taskDescription} is about to start in few minutes`;
    const params = {
        Message: message,
        Subject: 'Task Reminder',
        TopicArn: 'arn:aws:sns:us-east-1:533267164010:TaskReminders'
    };

    try {
        await sns.publish(params).promise();
        console.log('Reminder email sent successfully.');
    } catch (error) {
        console.error('Error sending reminder email:', error);
    }
  }); 


  const response = {
    statusCode: 200,
    body: JSON.stringify("Task added Successfully."),
  };
  
  return response;
};