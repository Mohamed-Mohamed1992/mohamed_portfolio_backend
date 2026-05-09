import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import profileRoutes from './routes/profileRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';
import { swaggerSpec } from './config/swagger';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Request logging
app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Mohamed Portfolio API Documentation',
}));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', profileRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Developer Portfolio API',
    version: '1.0.0',
    documentation: 'http://localhost:5000/api-docs',
    endpoints: {
      create: 'POST /api/profile',
      get: 'GET /api/profile',
      update: 'PUT /api/profile',
      partialUpdate: 'PATCH /api/profile',
      delete: 'DELETE /api/profile',
      public: 'GET /api/profile/public',
    },
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;