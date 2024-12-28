import mongoose from 'mongoose';
import { MONGO_URI, MONGO_URI_TEST, NODE_ENV } from './enviroment.js';

const connectDB = async () => {
  try {
    const uri = NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI;
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('Hubo un error al conectarse a la base de datos');
    process.exit(1); // Detiene la aplicación si no puede conectarse
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log('MongoDB desconectado');
};

export default connectDB;
