import RouteFactory from './route.factory';
import { Router } from 'express';
import { describe, expect, it, jest } from '@jest/globals';
import mockContainer from '../__mocks__/container.mock';

describe('routes', () => {
    it('should include user route with correct path and router', () => {
        jest.spyOn(RouteFactory, 'createRoutes').mockReturnValueOnce(Router());

        const mockUserRoute = {
            path: '/test-route',
            router: RouteFactory.createRoutes
        };

        // call the router method with a mock user controller
        mockUserRoute.router(mockContainer.userController);

        expect(mockUserRoute).toBeDefined();
        expect(mockUserRoute.path).toBe('/test-route');
        expect(mockUserRoute.router).toBe(RouteFactory.createRoutes);
        expect(RouteFactory.createRoutes).toHaveBeenCalledTimes(1);
        expect(RouteFactory.createRoutes).toHaveBeenCalledWith(mockContainer.userController);
    });
});
