import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import faqRoutes from './routes/faqRoutes';
import logRoutes from './routes/logRoutes';
import qrRoutes from './routes/qrRoutes';
import './whatsapp';

// Load Swagger API documentation
const swaggerDocument = YAML.load('swagger.yaml');

const app = express();
app.use(express.json());
app.use(cors());

// Swagger API documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Simple health check
app.get('/', (req: Request, res: Response) => {
  res.send('Customer Support WhatsApp Bot API is running.');
});

// Register routes
app.use('/api/faqs', faqRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/qrcode', qrRoutes);

// Starting the server
const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
