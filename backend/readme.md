# Junior Full-stack-Developer Exam - Backend Part

## Approach
My approach is to organize the route and model/database inside the app folder and have an main_app file that will be handling the flask app. Organizing the code in the app folder and having an __ init __.py made it organizing much easier. I also used the blueprints for the routes and made basic validations for the received response. I didn't use an ORM for this project since this is a small project and I can control more of the queries I need to execute. 

For the bonus task, I applied also some security practices like hashing the password before querying it to the database. The response that will be sent to the client will not include the password. I used JWT-based session/authentication that holds the client's session to access the protected-route