import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { format } from 'date-fns';

export async function getPeoples(app: FastifyInstance) {
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
            const peoples = await prisma.people.findMany();

            const transformedPeoples = peoples.map(person => ({
                ...person,
                birthDate: format(new Date(person.birthDate), 'yyyy-MM-dd'), 
            }));

            reply.send({ peoples: transformedPeoples });
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
            const { id } = request.params;

            const people = await prisma.people.findUnique({
                where: {
                    id
                }
            });

            if (!people) {
                reply.status(404);
                throw new Error("People not found");
            }

            reply.send({
                people: {
                    ...people,
                    birthDate: format(new Date(people.birthDate), 'yyyy-MM-dd'),
                }
            });
        })
}