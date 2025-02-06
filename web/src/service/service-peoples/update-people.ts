import { api } from "@/service/api";
import { People } from "@/types/people";

export interface ResponseUpdatePeople {
    people: People;
}

export async function serviceUpdatePeople(id: string, data: People): Promise<ResponseUpdatePeople> {
    try {
        const formattedData = {
            ...data,
            birthDate: data.birthDate.split('/').reverse().join('-')
        };
        const response = await api.put<ResponseUpdatePeople>(`/peoples/${id}`, formattedData);
        return response.data;
    } catch (erro: any) {
        if (erro.response ?? erro?.response.data.statusCode === 404) {
            throw {statusCode: 404, message: "Pessoa não encontrada"}
        }
        throw new Error("Não foi possível carregar informações da pessoa");
    }
}