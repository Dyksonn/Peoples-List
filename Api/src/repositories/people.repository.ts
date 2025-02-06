import { People } from "@prisma/client";
import { PeopleRepository, PeopleWithStringBirthDate } from "../types/people-type";
import { prisma } from "../lib/prisma";
import { format } from 'date-fns';

class PeopleRepositoryPrisma implements PeopleRepository {
    async create(data: Omit<People, "id">): Promise<People> {
        const peopleExists = await prisma.people.findFirst({
            where: {
                OR: [
                    { cpf: data.cpf },
                    { email: data.email }
                ]
            }
        })

        if (peopleExists !== null) {
            throw new Error("People already exists", { cause: { statusCode: 409 } });
        }

        const people = await prisma.people.create({
            data: {
                ...data,
                birthDate: new Date(data.birthDate),
            }
        })

        return people;
    }

    async delete(id: string): Promise<People> {
        const people = await prisma.people.delete({
            where: { id },
        });

        return people;
    }

    async list(): Promise<PeopleWithStringBirthDate[]> {
        const peoples = await prisma.people.findMany();

        const transformedPeoples = peoples.map(person => ({
            ...person,
            birthDate: format(new Date(person.birthDate), 'yyyy-MM-dd'), 
        }));

        return transformedPeoples;
    }

    async findById(id: string): Promise<PeopleWithStringBirthDate> {
        const people = await prisma.people.findUnique({
            where: {
                id
            }
        });

        if (!people) {
            throw new Error("People not found");
        }

        return {
            ...people,
            birthDate: format(new Date(people.birthDate), 'yyyy-MM-dd'),
        };
    }

    async putPeople(id: string, data: Omit<PeopleWithStringBirthDate, "cpf" | "id">): Promise<People> {
        const peopleEmailExists = await prisma.people.findUnique({
            where: { email: data.email }
        })

        if (peopleEmailExists && peopleEmailExists.id !== id) {
            throw new Error("Email already exists");
        }

        const updatedPeople = await prisma.people.update({
            where: { id },
            data: {
                ...data,
                birthDate: new Date(data.birthDate),
            }
        });

        return updatedPeople;
    }
}

export { PeopleRepositoryPrisma };