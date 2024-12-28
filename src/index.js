import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import authRouter from './Auth/auth.routes.js';
import userRouter from './User/user.routes.js';
import { errorHandler } from './middleware/errorHandle.js';
import { NODE_ENV, PORT } from './config/enviroment.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swaggerConfig.js';
import roleRouter from './Role/role.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

if (NODE_ENV !== 'test') {
  connectDB();
}

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/role', roleRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

if (NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}

export default app;
