import z from "zod";

export const createPeopleValidation = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string(),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
})