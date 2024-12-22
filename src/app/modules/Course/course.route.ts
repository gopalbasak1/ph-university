import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  CourseControllers.getAllCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;