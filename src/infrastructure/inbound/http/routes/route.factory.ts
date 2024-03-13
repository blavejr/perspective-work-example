// A factory class that creates the routes for the application
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import asyncErrorHandler from '../middleware/aysncErrorHandler';

export default class RouteFactory {
    static createRoutes(controller: any): Router {
        const router = Router();

        switch (controller.constructor) {
            case UserController:
                router
                    .get('/', asyncErrorHandler(controller.getAllUsers.bind(controller)))
                    .post('/', asyncErrorHandler(controller.create.bind(controller)));
                break;
            default:
                throw new Error('Controller not found');
        }

        return router;
    }
}
