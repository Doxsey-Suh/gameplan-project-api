#gameplan#

-This is the server-side component of GAMEPLAN, an easy-to-use application that allows users to create and keep track of goals. The client-side component repository can be found here: https://github.com/kdoxsey/gameplan-project-client

Technologies used:
Express
Mongoose
Mongodb
CORS
Passport

Future Updates:
-I want to create an additional schema for "sub-goals" or smaller goals nested within parent goals, which will require creating another schema and altering the current ERD.
-I want to add an "index all users' goals" function so that users can view other user's goals, but not update or delete them.

Planning and Developement:
Planning for the back-end portion of this project began with the Entity-Relationship Diagram https://imgur.com/nt8RswU
I planned to have goals with nested sub-goals but that will have to be implemented in a future version. I used Express to create the API which handles authorization and CRUD functionality. I started with the authorization, running curl requests in the terminal to verify that the API works. From there I was able to sign in as a user and build the CRUD functionality. On the API there is a Mongoose query on the 'index' request which tells the API to only index goals created by the current signed-in user. In future versions users will be able to view all users' goals but not edit them.

ERD:
https://imgur.com/nt8RswU

Important links:
Client Repo: https://github.com/kdoxsey/gameplan-project-client
Server Repo: https://github.com/kdoxsey/gameplan-project-api
Deployed Client: https://kdoxsey.github.io/gameplan-project-client/
Deployed Server: https://powerful-chamber-37250.herokuapp.com/
