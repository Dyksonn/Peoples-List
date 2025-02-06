import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { PeopleUseCase } from "../useCases/people-usecases";

export async function deletePeoples(app: FastifyInstance) {
    const peopleUseCase = new PeopleUseCase();
    app
        .withTypeProvider<ZodTypeProvider>()
        .delete("/peoples/:id", {
            schema: {
                params: z.object({
                    id: z.string().uuid()
                }),
                response: {}
            }
        }, async (request, reply) => {
            const { id } = request.params;
            
            const peopleDeleted = await peopleUseCase.delete(id);

            if (!peopleDeleted) {
                return reply.status(404).send({ message: "People not found" });
            }

            reply.status(200).send({ message: "People deleted" });
        })
}