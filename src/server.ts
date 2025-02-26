import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
    console.log("Error loading .env file and aborting. Error:", result.error);
    process.exit(1);
}

import * as express from 'express';
import { root } from './routes/root';
import * as utils from './utils';

const app = express();

function setupExpress() {
    app.route("/").get(root);
}

function startServer() {
    let port: number;
    console.log('Process arguments:', process.argv);
    const portArg = process.argv[2];

    const portEnv = process.env.PORT;

    if (utils.isInteger(portEnv)) {
        port = parseInt(portEnv);
    } else if (utils.isInteger(portArg)) {
        port = parseInt(portArg);
    } else {
        port = 9000; // Default port if the argument is not a valid integer
    }

    console.log(`Starting server on port ${port}...`);

    app.listen(port, () => {
        console.log(`v2 HTTP Server running at http://localhost:${port}`);
    });
}

setupExpress();
startServer();
