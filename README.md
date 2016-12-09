# Titan-Helper

##Installation

###Required Software

- Download and install [Node.js](https://nodejs.org/en/download/) version 6.4

- Download and install [MongoDB](https://www.mongodb.com/download-center#community) version 3.4

- Download and install [RoboMongo](https://robomongo.org/download) any version

- Clone the repo into a local directory `git clone https://github.com/aJimmer/Titan-Helper.git`

###Database Setup

- After successfully installing mongodb, open robomongo and create a new connection

- Create a new database called **mean-machine**

- In your new database, under the Collections directory, create 2 collections one called **buildings** and one called **users**

- find the **buildings.json** file in the root directory and copy its contents into your new **buildings** collection by inserting a new document and pasting the content

- the users collection will be populated by the user through registration

###Starting Server

- run `npm install` to install dependencies in **package.json**

- `node server.js` to launch on localhost:3000

- Open up google chrome and go to http://localhost:3000
