import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
    console.log("Error loading .env file and aborting. Error:", result.error);
    process.exit(1);
}

import 'reflect-metadata';
import * as express from 'express';
import { root } from './routes/root';
import * as utils from './utils';
import { logger } from './logger';
import { AppDataSource } from './datasource';
import { getAllCourses } from './routes/get-all-courses';

const app = express();

function setupExpress() {
    app.route("/").get(root);

    app.route("/api/courses").get(getAllCourses)
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

        logger.info(`v2 HTTP Server running at http://localhost:${port}`);
    });
}




AppDataSource.initialize()
.then(() => {
    logger.info("Datasource initialized successfully");
    setupExpress();
    startServer(); 
})
.catch((error) => {
    logger.error("Error initializing datasource: ", error);
    process.exit(1);
});