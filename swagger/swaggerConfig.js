// swagger/swaggerConfig.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger V.1.0",
      version: "1.0.0",
      description: "Documentación de mi API Express con Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Ruta a los archivos de rutas donde están las anotaciones de Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
