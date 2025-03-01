import * as dotenv from 'dotenv';

const result = dotenv.config();

import "reflect-metadata";
import { AppDataSource } from '../datasource';
import { Course } from './course';
import { Lesson } from './lesson';

async function deleteDb() {
    await AppDataSource.initialize();
    
    console.log("Database connection ready.")

    console.log("Deleting LESSONS table...");
    AppDataSource.getRepository(Lesson).delete({});
    console.log("Deleting COURSES table...");
    AppDataSource.getRepository(Course).delete({});

}

deleteDb()
    .then(() => {
        console.log("Database has been deleted successfully.");
        process.exit(0)
    })
    .catch((error) => {
        console.log("Error deleting the database: ", error);
        process.exit(1);
    });