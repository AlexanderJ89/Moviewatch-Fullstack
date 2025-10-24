import swaggerJSDoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Moviewatch API",
            version: "1.0.0",
            description: "API för att hantera filmer och användare med JWT-baserad autentisering.",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
 /*        security: [
            {
                bearerAuth: [],
            },
        ], */
    },
    apis: ["./routes/*.js"],
}

const swaggerDocumentation = swaggerJSDoc(options)

export default swaggerDocumentation