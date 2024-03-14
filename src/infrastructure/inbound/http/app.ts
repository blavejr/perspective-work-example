import express from 'express';
// container handles the dependency injection
import container from './container';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import routes from './routes/routes';
import { LogRequestsMiddleware } from './middleware/logger';

const app = express();
app.use(cors())
app.use(express.json())
app.options('*', cors());
// TODO: this should be injected into the express app and other classes in the container
app.use(LogRequestsMiddleware);

app.use(express.urlencoded({ extended: true }));

// Load Routes
routes.forEach((route) => {
  app.use(route.path, route.router(container.userController));
});

// Add Error Handler Middleware
app.use(errorHandler);

// Export the app to be used in the server and tests
export default app;
