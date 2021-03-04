# Herd Mobile

# Project Summary
Herd is a restaurant recommendation app that relies on a social network of users to make its recommendations. Most competitor applications rely on user ratings of restaurants which results in users receiving similar suggestions from a similar pool of well-rated restaurants. In this way, they fail to provide a personalized experience to each user. Instead of following this typical ratings based recommendation system, Herd recommends restaurants according to each user’s social network and the restaurants that each user’s friends have enjoyed. This creates a much more unique and valuable experience for the user.

# Framework
Since the application needs to be mobile, the front end framework needs to provide mobile development and deployment capabilities. React Native is an open-source framework designed to enable developers to use the React framework in a native, mobile context. This includes iOS and Android platforms and, therefore, the mobile technical requirement. Furthermore, due to its resemblance to the web application framework, it provides the additional advantage of having a shorter typical learning curve for developers than traditional native languages. 

The above diagram shows the overall system design of the application. The previously discussed React Native component interacts with multiple AWS services managed by AWS Amplify. Amplify is a service which provides the ability to 

Python Flask: The framework to build the backend of the application. Resembles Django. Provides existing templates we can use to show either a list view of restaurants or the detail view of a particular restaurant. Structures the application with MVC pattern. Supports fast and cheap demos during the development phase by providing a built-in database with data directly stored in a database file. Supports basic authentication such as signup and login.

SQLAlchemy: Manages the databases and provides an ORM to easily perform database operations in application logic. Will design data models and perform CRUD operations based on the object relational mapping functionalities it provides. 



AWS Amplify: A JavaScript library to allow easy access of developers to cloud services. Utilizes cloud services to make our application more scalable and robust. Allows the application to take advantage of various AWS services such as AI and database services, which are crucial for building a recommendation system that is both intelligent and scalable.

Database services of AWS are used to make the application scalable in storage.


