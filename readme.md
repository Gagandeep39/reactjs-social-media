# Notes
- [Notes](#notes)
  - [Packages Uses](#packages-uses)
  - [package.json](#packagejson)
  - [Running the Application](#running-the-application)
  - [Connection](#connection)

## Packages Uses
- `express` - Create Server
- `expressvalidator` - Form Validation
- `bcryptjs` - Paword Encryption
- `config` - Global Variables
- `gravatar` - Show profile Pic
- `jsonwebtoken` - Used for web token
- `mongoose` - Interact with database
- `request` - Make an Http request to anothe api
- `nodemon` - To prevent our server from sleeping
- `concurrently` - To run express and react dev server at the same time

## package.json
```json
"scripts": {
    "start": "node server",
    "server": "nodemon server",
  },
```
- `start` script will execute Common `node server` in cloud deployment
- `server` will execute `nodemon server` in local running

## Running the Application
- Launch the server - `npm run server`

## Connection 
1. Create a global Config file `default.json`
2. Get the API key from MOngo dashboard and create a key value pair
  - Cluster -> Select your cluster -> Connect -> Connect your application -> Copy connection string
3. Write conenction logic and export it (API key is accesssed here using `config` library)
4. Use the exported variable amd connect to server from `server.js`