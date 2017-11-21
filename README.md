# Assignment
1) This is a pure nodejs backend application which runs via commandline and listens to a TCP port.
2) Open the command line and go to the path of this project, run the npm install command in the terminal. And then navigate to the folder which contains the assign.js file and run the command- node assign.js This will start the application on port 3000.
3) This application can be run using Postman and has two routes.
4) When the user visits /assignment, the server will return a JSON object with the content of https://jsonplaceholder.typicode.com/posts
but with the title and body content on the reverse order in which is given
5)When the user submits any text plain to /ingest (in the body), the server returns a URL in which the user can download an image containing the text submitted.

