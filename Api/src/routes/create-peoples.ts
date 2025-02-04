import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { createPeopleValidation } from "../validations/create";

export async function createPeoples(app: FastifyInstance) {
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
                const {
                    name,
                    email,
                    cpf,
                    birthDate,
                    phone,
                    address,
                    city,
                } = request.body;
    
                const peopleExists = await prisma.people.findFirst({
                    where: {
                        OR: [
                            { cpf },
                            { email }
                        ]
                    }
                })
    
                if (peopleExists !== null) {
                    throw new Error("People already exists", { cause: { statusCode: 409 } });
                }
    
                const people = await prisma.people.create({
                    data: {
                        name,
                        email,
                        cpf,
                        birthDate: new Date(birthDate),
                        phone,
                        address,
                        city,
                        state: request.body.state,
                    }
                })
    
                return { peopleId: people.id };
            } catch (error: any) {
                reply.status(error.cause.statusCode).send({ message: error.message });
            }
        })
}