const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AYS Order Details API",
      version: "1.0.0",
      description: "API Documentation for AYS Order Details Service",
    },
    servers: [
      {
        url: "http://localhost:8200/api/v1/ays-svc",
      },
    ],
  },
  apis: ["./routes/*.js"], // path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
