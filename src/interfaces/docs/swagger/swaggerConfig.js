// swagger/swaggerConfig.js
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "La Brújula Llanera API - Documentation",
      version: "1.0.0",
      description: "API for the La Brújula Llanera management system",
      contact: {
        name: "Equipo de Desarrollo",
        email: "soporte@labrujulallanera.com"
      },
      license: {
        name: "MIT"
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo local"
      },
      {
        url: "https://api.labrujulallanera.com/v1",
        description: "Servidor de producción"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Introduce el token JWT sin el prefijo 'Bearer'"
        }
      },
      schemas: {
        User: {
          type: "object",
          required: ["nombre", "correo"],
          properties: {
            id_Usuario: {
              type: "integer",
              example: 1,
              readOnly: true
            },
            nombre: {
              type: "string",
              minLength: 3,
              maxLength: 50,
              example: "Juan Pérez"
            },
            correo: {
              type: "string",
              format: "email",
              example: "usuario@ejemplo.com"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2023-05-21T12:34:56Z"
            }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Mensaje de error descriptivo"
            },
            details: {
              type: "array",
              items: {
                type: "string"
              },
              example: ["Detalle adicional del error 1", "Detalle 2"]
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: "Token inválido o no proporcionado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse"
              }
            }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    externalDocs: {
      description: "Guía de implementación",
      url: "https://docs.labrujulallanera.com"
    }
  },
  apis: [
    path.join(__dirname, '..', '..', 'routes', '*.js'),
    path.join(__dirname, '..', '..', 'routes', '*.yaml')
  ]
};

// Generación con validación robusta
const generateSwaggerSpec = () => {
  try {
    const spec = swaggerJSDoc(options);
    
    if (!spec || !spec.info) {
      throw new Error("La especificación generada es inválida");
    }
    return spec;
  } catch (error) {
    console.error("❌ Error al generar la especificación Swagger:", error.message);
    throw new Error(`Falló la generación de Swagger: ${error.message}`);
  }
};

const swaggerSpec = generateSwaggerSpec();

export default swaggerSpec;