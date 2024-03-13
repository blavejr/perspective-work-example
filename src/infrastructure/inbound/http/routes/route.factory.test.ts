import { Router } from 'express';
import RouteFactory from '../routes/route.factory';
import { describe, expect, test, jest, beforeEach, afterEach } from '@jest/globals';

import mockContainer from '../__mocks__/container.mock'

describe('RouteFactory', () => {
    describe('createRoutes', () => {
        test('should create routes for UserController', () => {
            const createRoutesSpy = jest.spyOn(RouteFactory, 'createRoutes').mockReturnValue(Router().get('/').post('/'));
            const router = RouteFactory.createRoutes(mockContainer.userController);
            expect(router.stack).toHaveLength(2);
            expect(createRoutesSpy).toHaveBeenCalledTimes(1);
            createRoutesSpy.mockRestore();
        });

        test('should throw an error for unknown controller', () => {
            const unknownController = {};
            expect(() => RouteFactory.createRoutes(unknownController)).toThrowError("Controller not found");
        });
    });
});
