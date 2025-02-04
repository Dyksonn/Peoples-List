import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createPeoples } from "./routes/create-peoples";
import { getPeoples } from "./routes/get-peoples";
import { putPeoples } from "./routes/put-peoples";
import { deletePeoples } from "./routes/delete-people";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createPeoples);
app.register(getPeoples);
app.register(putPeoples);
app.register(deletePeoples);

app.listen({ port: 3333 }).then(() => {
    console.log("Server is running on port 3333");
})