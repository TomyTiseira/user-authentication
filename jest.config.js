export default {
  testEnvironment: 'node', // Asegura que Jest use un entorno compatible con Node.js
  transform: {
    '^.+\\.js$': 'babel-jest' // Usa Babel para transformar los archivos .js
  }
};
