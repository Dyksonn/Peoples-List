import { People } from "@prisma/client";
import { PeopleRepositoryPrisma } from "../repositories/people.repository";
import { PeopleRepository, PeopleWithStringBirthDate } from "../types/people-type";
import { format } from "date-fns";

class PeopleUseCase {
    private peopleRepository: PeopleRepository;
    constructor() {
        this.peopleRepository = new PeopleRepositoryPrisma();
    }

    async create({
        name,
        email,
        cpf,
        birthDate,
        phone,
        address,
        city,
        state,
    }:Omit<People, "id">): Promise<People> {
        const people = await await this.peopleRepository.create({
            name,
            email,
            cpf,
            birthDate,
            phone,
            address,
            city,
            state,
        });

        return people;
    }

    async delete(id: string): Promise<People> {
        const people = await this.peopleRepository.delete(id);

        return people;
    }

    async list(): Promise<PeopleWithStringBirthDate[]> {
        const peoples = await this.peopleRepository.list();

        return peoples;
    }

    async findById(id: string): Promise<PeopleWithStringBirthDate> {
        const people = await this.peopleRepository.findById(id);

        return people;
    }

    async putPeople(id: string, data: Omit<PeopleWithStringBirthDate, "cpf" | "id">): Promise<PeopleWithStringBirthDate> {
        const people = await this.peopleRepository.putPeople(id, data);

        return {
            ...people,
            birthDate: format(new Date(people.birthDate), 'yyyy-MM-dd')
        }
    }
}

export { PeopleUseCase };