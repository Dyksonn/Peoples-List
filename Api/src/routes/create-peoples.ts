import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { createPeopleValidation } from "../validations/create";
import { PeopleUseCase } from "../useCases/people-usecases";

export async function createPeoples(app: FastifyInstance) {
    const peopleUseCase = new PeopleUseCase();
    app
        .withTypeProvider<ZodTypeProvider>()
        .post("/peoples", {
            schema: {
                body: createPeopleValidation,
                response: {
                    201: z.object({
                        peopleId: z.string().uuid(),
                    }),
                    409: z.object({
                        message: z.string(),
                    }),
                }
            }
        }, async (request, reply) => {
            try {
                const data = request.body;

    
                const people = await peopleUseCase.create({
                    ...data,
                    birthDate: new Date(data.birthDate),
                })
    
                return { peopleId: people.id };
            } catch (error: any) {
                reply.status(error.cause.statusCode).send({ message: error.message });
            }
        })
}