import { People } from "@/types/people";
import { serviceByIdPeople,  } from "./byId-people";
import { serviceListAllPeoples, ResponseListAllPeoples } from "./list-people";
import { serviceCreatePeople, ResponseCreatePeople } from "./create-people";
import { serviceDeletePeople, ResponseDeletePeople } from "./delete-people";
import { ResponseUpdatePeople, serviceUpdatePeople } from "./update-people";

export const servicePeople = {
    getByIdPeople: async (id: string) => serviceByIdPeople(id),
    listPeople: async (): Promise<ResponseListAllPeoples> => serviceListAllPeoples(),
    createPeople: (people: People): Promise<ResponseCreatePeople> => serviceCreatePeople(people),
    updatePeople: (id: string, people: People): Promise<ResponseUpdatePeople> => serviceUpdatePeople(id, people),
    deletePeople: (id: string): Promise<ResponseDeletePeople> => serviceDeletePeople(id),
}