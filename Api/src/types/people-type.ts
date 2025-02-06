import { People } from "@prisma/client";

type ReplacePropertyType<T, K extends keyof T, U> = Omit<T, K> & { [P in K]: U };
export type PeopleWithStringBirthDate = ReplacePropertyType<People, "birthDate", string>;

export interface PeopleRepository {
    create: (data: Omit<People, "id">) => Promise<People>;
    delete: (id: string) => Promise<People>;
    list: () => Promise<PeopleWithStringBirthDate[]>;
    findById: (id: string) => Promise<PeopleWithStringBirthDate>;
    putPeople: (id: string, data: Omit<PeopleWithStringBirthDate, "cpf" | "id">) => Promise<People>;
}