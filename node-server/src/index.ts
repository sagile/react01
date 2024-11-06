import express from 'express';
import cors from 'cors';
import helloRoute from './routes/hello';
import textsRoute from './routes/texts';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/hello', helloRoute);
app.use('/api/texts', textsRoute);  // Register the new route

export default app;
