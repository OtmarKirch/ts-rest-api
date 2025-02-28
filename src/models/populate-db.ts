import * as dotenv from 'dotenv';

const result = dotenv.config();

import "reflect-metadata";

import { COURSES } from "./db-data";
import { AppDataSource } from '../datasource';
import { DeepPartial } from 'typeorm';
import { Course } from './course';
import { Lesson } from './lesson';

async function populateDb() {

    await AppDataSource.initialize();

    console.log("Database connection ready.")

    const courses = Object.values(COURSES) as DeepPartial<Course>[];

    const courseRepository = AppDataSource.getRepository(Course);

    const lessonsRepository = AppDataSource.getRepository(Lesson);

    for (let courseData of courses) {
        console.log("Adding course: ", courseData.title);
        const course = courseRepository.create(courseData);
        await courseRepository.save(course);

        for (let lessonData of courseData.lessons) {
            console.log("Adding lesson: ", lessonData.title);
            const lesson = lessonsRepository.create(lessonData);
            lesson.course = course;
            await lessonsRepository.save(lesson);
        }
    }

    const totalCourses = await courseRepository
        .createQueryBuilder()
        .getCount();

        const totalLessons = await courseRepository
        .createQueryBuilder()
        .getCount();
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