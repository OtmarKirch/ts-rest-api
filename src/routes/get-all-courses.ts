import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';
import { AppDataSource } from '../datasource';
import { Course } from '../models/course';

export async function getAllCourses(
    request: Request,
    response: Response,
    next: NextFunction) {

    try {
        logger.debug("Getting all courses...");

    throw {error: "Thrown ERROR"}

    const courses = await AppDataSource
        .getRepository(Course)
        .createQueryBuilder("course")
        .orderBy("course.seqNo")
        .getMany();

    response.status(200).json({courses})
    } catch (error) {
        logger.error("Error in getAllCourses: ", error);
        next(error)
    }
    
}