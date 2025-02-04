import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function deletePeoples(app: FastifyInstance) {
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

            const deletePeople = await prisma.people.delete({
                where: { id },
            });

            console.log(deletePeople);

            reply.status(200).send({ message: "People deleted" });
        })
}