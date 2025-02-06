import fastify from "fastify";
import fastifyCors from '@fastify/cors'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { createPeoples } from "./routes/create-peoples";
import { getPeoples } from "./routes/get-peoples";
import { putPeoples } from "./routes/put-peoples";
import { deletePeoples } from "./routes/delete-people";

const app = fastify();

app.register(fastifyCors, {
    origin: '*',
    credentials: true,
});

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'People API',
            description: 'API to manage peoples',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createPeoples);
app.register(getPeoples);
app.register(putPeoples);
app.register(deletePeoples);

app.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port 3333");
})