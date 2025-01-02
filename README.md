# Smart Reminder

## Author
* [Shubham](mailto:shubhamjethva92@gmail.com) - *(Maintainer)*

## Prerequisites
- **Node.js**: Install the latest version of Node.js from [here](https://nodejs.org/)
- **React.js**: Install the latest version of React.js from [here](https://legacy.reactjs.org/)

## Application Overview
**Smart Reminder** is an Azure-based application designed to help users receive timely task reminders. The application architecture leverages various Azure services to ensure scalability, security, and cost-effectiveness, adhering to the principles of operational excellence, security, reliability, and performance efficiency.

The backend services are managed on Azure using a combination of Azure API Management, Virtual Network (VNet) with public and private subnets, Azure Virtual Machines (VMs), Azure Functions, Azure Load Balancer, and Autoscale. This infrastructure is protected with security groups and Azure Active Directory (Azure AD) to enforce access control and security policies.

## Technologies Used
- **React JS**: A JavaScript library used for building dynamic and responsive user interfaces, providing a seamless user experience.
- **Azure**: Microsoft Azure provides the platform and tools for hosting and managing this application.

## Azure Services and Architecture Components

### 1. **Azure Virtual Network (VNet)**
   - The application is deployed in an Azure VNet, which provides isolated networking environments with public and private subnets for enhanced security and traffic control.
   - **Subnets**:
     - **Public Subnet**: Hosts internet-accessible components, such as Azure VMs and load balancers.
     - **Private Subnet**: Hosts internal resources like databases that do not require direct internet access.

### 2. **Azure Virtual Machines (VMs)**
   - Azure VMs are used to host and run the application, providing scalable compute resources as per demand.
   - **Autoscale**: Ensures the application automatically scales in or out based on traffic, maintaining optimal performance and minimizing costs.
   - **Azure Load Balancer**: Distributes incoming application traffic across multiple VMs, improving fault tolerance and availability.

### 3. **Azure API Management**
   - Azure API Management provides a RESTful interface to communicate with backend services, handling HTTP requests and routing them to the appropriate Azure Functions or VMs.
   - Supports request validation, throttling, and monitoring for efficient API management.

### 4. ** Azure Functions**
   - Azure Functions are used for backend processing and task reminder logic. The serverless approach allows for scaling based on demand without manual infrastructure management.
   - Used to trigger notifications, update tasks, and handle event-driven functions in response to API requests.

### 5. **Azure Cosmos DB**
   - Azure Cosmos DB is used as the primary database to store task information. It offers high scalability, fast performance, and automated backup for seamless data management.
   - Data is structured with primary and secondary indexes to support efficient querying and retrieval of task details.

### 6. **Azure Active Directory (Azure AD)**
   - Azure AD is set up to manage access to Azure resources securely, assigning permissions to Azure Functions, VMs, and other Azure services.
   - Enforces the principle of least privilege, restricting access based on the specific needs of each component.

### 7. **Security Groups**
   - Security Groups are configured to control inbound and outbound traffic for the VMs, VNet, and other Azure resources, adding an additional layer of security.
   - Rules are customized to allow necessary communications while preventing unauthorized access.

### 8. **Azure Notification Hubs**
   - Azure Notification Hubs are used to send notifications to users as reminders before the task deadline, offering reliability in message delivery.
   - Works in tandem with Azure Functions to trigger reminders automatically, ensuring users receive timely updates.

### 9. **Azure Service Bus**
   - Azure Service Bus is used to decouple components and manage asynchronous communication between services, improving application resilience.
   - Provides message buffering and processing for tasks that may require delayed processing, reducing system load and handling peak traffic efficiently.

### 10. **Azure Load Balancer**
   - Azure Load Balancer distributes incoming application traffic across multiple VMs in the Autoscale group, enhancing availability and fault tolerance.
   - Supports health checks and automatic failover to ensure reliable service performance.

### 11. **Autoscale**
   - Autoscale automatically adjusts the number of Azure VMs based on demand, optimizing performance and cost.
   - Ensures high availability and handles traffic spikes efficiently without manual intervention.

### 12. **Network Address Translation (NAT) Gateways**
   - NAT Gateway is used to allow instances in the private subnet to connect to the internet (for software updates, etc.) without exposing them to inbound internet traffic.


## Four Pillars of Azure Architecture
The architecture for Smart Reminder follows the principles of Azure’s well-architected framework:
1. **Operational Excellence**: The application is designed to monitor and improve based on logs and performance metrics from Azure Monitor and Application Insights.
2. **Security**: Azure AD, Security Groups, and private subnets protect sensitive resources, while encryption and authorization protocols (e.g., JWT) ensure data security.
3. **Reliability**: Autoscale, Azure Load Balancer, and redundancy across multiple regions ensure continuous availability and failover support.
4. **Cost Optimization**:  Leveraging serverless Azure Functions, Autoscale, and Azure Cosmos DB's consumption-based pricing minimizes unnecessary costs while meeting application demands.