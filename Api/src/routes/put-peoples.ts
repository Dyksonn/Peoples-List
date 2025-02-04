import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { format } from 'date-fns';

export async function putPeoples(app: FastifyInstance) {
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
            const {
                name,
                email,
                birthDate,
                phone,
                address,
                city,
                state
            } = request.body;

            const peopleEmailExists = await prisma.people.findUnique({
                where: { email }
            })

            if (peopleEmailExists && peopleEmailExists.id !== id) {
                throw new Error("Email already exists");
            }

            const updatedPeople = await prisma.people.update({
                where: { id },
                data: {
                    name,
                    email,
                    birthDate: new Date(birthDate),
                    phone,
                    address,
                    city,
                    state
                }
            });

            reply.status(200).send({ people: {
                ...updatedPeople,
                birthDate: format(new Date(birthDate), 'yyyy-MM-dd')
            } });
        })
}