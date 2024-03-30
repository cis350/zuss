Setup instructions

- backend dependencies and files are located in "backend" folder
- frontend located in zuss-app
- set up a virtual environment to make it easier to manage dependencies:

INSTALL SCRIPTS: 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install node
nvm use node

Then navigate to your project directory and install your project dependencies as usual
by running "npm install" (make sure to do this in the backend and frontend folders as
well as install general dependencies in the parent directory)

to run the  app: cd backend > node index.js

*ENVIRONMENT VARIABLES - important!
Everyone will have to set up their own environment variables to store the database credentials.
- create a file called ".env" in the backend folder. Inside, paste 
MONGODB_URI= and put the database connection string right after.
- ***do not add any spaces or quotes or it won't work***

DATABASE LINK: https://cloud.mongodb.com/v2/65fca404d7189a29f502a442#/clusters/detail/zuss
- currently, login details (user and pass) is stored in the collection titled 'ProfileInfo'
under the database titled 'FormInputs.' Under FormInputs, there is also a 'Clubs' collection
to store event details. 
