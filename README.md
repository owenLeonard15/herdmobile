# Herd Mobile

# Project Summary
Herd is a restaurant recommendation app that relies on a social network of users to make its recommendations. Most competitor applications rely on user ratings of restaurants which results in users receiving similar suggestions from a similar pool of well-rated restaurants. In this way, they fail to provide a personalized experience to each user. Instead of following this typical ratings based recommendation system, Herd recommends restaurants according to each user’s social network and the restaurants that each user’s friends have enjoyed. This creates a much more unique and valuable experience for the user.

# Framework
Since the application needs to be mobile, the front end framework needs to provide mobile development and deployment capabilities. React Native is an open-source framework designed to enable developers to use the React framework in a native, mobile context. This includes iOS and Android platforms and, therefore, the mobile technical requirement. Furthermore, due to its resemblance to the web application framework, it provides the additional advantage of having a shorter typical learning curve for developers than traditional native languages. 

The above diagram shows the overall system design of the application. The previously discussed React Native component interacts with multiple AWS services managed by AWS Amplify. Amplify is a service which provides the ability to allow easy access of developers to cloud services. It utilizes cloud services to make our application more scalable and robust. Furthermore, it allows the application to take advantage of various AWS services such as AI and database services, which are crucial for building a recommendation system that is both intelligent and scalable.

In this application, we also use database services of AWS to make the application scalable in storage.


