import * as dotenv from 'dotenv';

const result = dotenv.config();

import "reflect-metadata";

import {COURSES} from "./db-data";
import { AppDataSource } from '../datasource';

async function populateDb() {

    await AppDataSource.initialize();

    console.log("Database connection ready.")

}

populateDb()
    .then(() => {
        console.log("Database has been populated successfully.");
        process.exit(0)
    })
    .catch((error) => {
        console.log("Error populating the database: ", error);
        process.exit(1);
    });