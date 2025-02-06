import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { PeopleUseCase } from "../useCases/people-usecases";

export async function putPeoples(app: FastifyInstance) {
    const peopleUseCase = new PeopleUseCase();
    app
        .withTypeProvider<ZodTypeProvider>()
        .put("/peoples/:id", {
            schema: {
                params: z.object({
                    id: z.string().uuid()
                }),
                body: z.object({
                    name: z.string(),
                    email: z.string().email(),
                    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
                    phone: z.string(),
                    address: z.string(),
                    city: z.string(),
                    state: z.string(),
                }),
                response: {
                    200: z.object({
                        people: z.object({
                            id: z.string().uuid(),
                            name: z.string(),
                            email: z.string().email(),
                            birthDate: z.string(),
                            phone: z.string(),
                            address: z.string(),
                            city: z.string(),
                            state: z.string(),
                        })
                    })
                }
            }
        }, async (request, reply) => {
            const { id } = request.params;
            const data = request.body;

            const updatedPeople = await peopleUseCase.putPeople(id, data);
            
            reply.status(200).send({ people: updatedPeople });
        })
}