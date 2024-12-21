import mongoose from 'mongoose';
import { MONGO_URI } from './enviroment.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('Hubo un error al conectarse a la base de datos');
    process.exit(1); // Detiene la aplicación si no puede conectarse
  }
};

export default connectDB;
