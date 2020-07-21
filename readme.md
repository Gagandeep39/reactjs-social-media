# Notes
- [Notes](#notes)
  - [Packages Uses](#packages-uses)
  - [package.json](#packagejson)

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