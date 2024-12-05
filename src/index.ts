import express, { Request, Response, Express, NextFunction } from 'express';
import rootRouter from './routes/indexRoutes'; // Assuming you have your routes here
import { PORT } from './secret';
const app: Express = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Worldddddddddd');
});

// Define API routes
app.use('/api', rootRouter);

// 404 handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).send({ message: 'Route not found' });
});

// Error-handling middleware - Should be the last middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); 
  res.status(500).send({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
