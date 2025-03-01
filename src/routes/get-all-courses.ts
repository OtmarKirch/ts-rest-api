import { Request, Response } from 'express';
import { logger } from '../logger';
import { AppDataSource } from '../datasource';
import { Course } from '../models/course';

export async function getAllCourses(request: Request, response: Response) {
    
    logger.debug("Getting all courses...");

    const courses = await AppDataSource
        .getRepository(Course)
        .createQueryBuilder("course")
        .orderBy("course.seqNo")
        .getMany();

    response.status(200).json({courses})
}