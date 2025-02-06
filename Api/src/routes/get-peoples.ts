import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { format } from 'date-fns';
import { PeopleUseCase } from "../useCases/people-usecases";

export async function getPeoples(app: FastifyInstance) {
    const peopleUseCase = new PeopleUseCase();
    app
        .withTypeProvider<ZodTypeProvider>()
        .get("/peoples", {
            schema: {
                response: {
                    200: z.object({
                        peoples: z.array(z.object({
                            id: z.string().uuid(),
                            name: z.string(),
                            email: z.string().email(),
                            cpf: z.string(),
                            birthDate: z.string(),
                            phone: z.string(),
                            address: z.string(),
                            city: z.string(),
                            state: z.string(),
                        }))
                    })
                }
            }
        }, async (request, reply) => {
            const peoples = await peopleUseCase.list();

            reply.send({ peoples: peoples });
        })

    app
        .withTypeProvider<ZodTypeProvider>()
        .get("/peoples/:id", {
            schema: {
                params: z.object({
                    id: z.string().uuid()
                }),
                response: {
                    200: z.object({
                        people: z.object({
                            id: z.string().uuid(),
                            name: z.string(),
                            email: z.string().email(),
                            cpf: z.string(),
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
            try {
                const { id } = request.params;

                const people = await peopleUseCase.findById(id);

                reply.send({
                    people,
                });
            } catch (error: any) {
                if (error.message === "People not found") {
                    reply.status(404);
                    throw new Error("People not found");
                }
            }
        })
}