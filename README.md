# QRCA

Backend for the mobile app QRCA.

## Setup

To set up and run the project you will need to have [node](https://nodejs.org/en/) installed.

First run `npm install` and wait for the dependencies to finish installing.

Next, copy and rename the `.env.example` files in the backend to `.env`. Do not delete the `.env.example`.

Next, update the values of the `username`, `password`, and `database_name` fields in the URIs.

Lastly you should be able to start the project by simply running `npm run dev`.

**OPTIONAL** To get linting to work in your IDE of choice (for example VSCode), install the [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) plugins.

### Backend

The backend uses [Express.js](https://expressjs.com/) as server for hosting a REST API, which is all set up inside the `src/index.js`.
Backend also uses several other library:

- [Mongoose](https://expressjs.com/) as ODM for Mongo DB
- [cors](https://www.npmjs.com/package/cors) as enabler for CORS requests
- [winston](https://www.npmjs.com/package/winston) for logging any activity that happens inside the backend service

#### Backend Folder Structure

```
backend
├───src
    ├───logs (included in .gitignore)
    ├───models
    │   └───schemas in the database
    ├───router (put route definitions here)
    ├───utils (mainly for debugging purposes, feel free to skip this)
    ├───.env.example
    ├───app.js
    ├───index.js
    ├───package.json
    ├───package-lock.json
    └───(linting files)
```

Folders and files explanation:

- `models` => contains all the schemas used in the database
- `router` => route definitions are stored in here
- `utils` => utility files/functions, feel free to skip this if you need to
- `.env.example` => contains info about the environment variables used in the server
- `app.js` => contains router and middleware setup
- `index.js` => entry point for the server

#### Logs

After you start the backend server, a folder will be created automatically, named the `logs` folder. There are 5 log files that will be created and updated as the server runs, here is the actual place where any activity logs on the backend will be recorded.

#### ENV Variables

Env variable names inside `package/backend/.env.example` should be self explanatory. Here is more explanation of them:

- `PORT` => Backend service port
- `MONGODB_URI_TEST` => mongodb connection string, [you can find the details for it here](https://docs.mongodb.com/manual/reference/connection-string/)
