# Herd Mobile

# Project Summary
Herd is a restaurant recommendation app that relies on a social network of users to make its recommendations. Most competitor applications rely on user ratings of restaurants which results in users receiving similar suggestions from a similar pool of well-rated restaurants. In this way, they fail to provide a personalized experience to each user. Instead of following this typical ratings based recommendation system, Herd recommends restaurants according to each user’s social network and the restaurants that each user’s friends have enjoyed. This creates a much more unique and valuable experience for the user.

# Framework
Since the application needs to be mobile, the front end framework needs to provide mobile development and deployment capabilities. React Native is an open-source framework designed to enable developers to use the React framework in a native, mobile context. This includes iOS and Android platforms and, therefore, the mobile technical requirement. Furthermore, due to its resemblance to the web application framework, it provides the additional advantage of having a shorter typical learning curve for developers than traditional native languages. 

![alt text](/final_architecture.png)

The above diagram shows the overall system design of the application. The previously discussed React Native component interacts with multiple AWS services managed by AWS Amplify. Amplify is a service which provides the ability to build scalable, configurable backend services quickly and seamlessly connect them to the frontend. These characteristics make it possible to integrate multiple different technical components that are necessary for the core functionality of the application. 

For example, the application needs to include multiple backend database services which will need to work together to store all data necessary for a social network. Amplify utilizes DynamoDB to seamlessly integrate these services and to make them easily accessible via another AWS service called Elasticsearch. In combination, this allows for scalable data storage that is also easily accessible and quickly retrievable. All of this functionality is abstracted from both users and developers by a GraphQL API. 


