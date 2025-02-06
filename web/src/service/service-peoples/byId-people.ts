import { api } from "@/service/api";
import { People } from "@/types/people";

export interface ResponseByIdPeople {
    people: People;
}

export async function serviceByIdPeople(id: string): Promise<ResponseByIdPeople> {
    try {
        const response = await api.get<ResponseByIdPeople>(`/peoples/${id}`);
        return response.data;
    } catch (erro: any) {
        if (erro.response ?? erro?.response.data.statusCode === 404) {
            throw {statusCode: 404, message: "Pessoa não encontrada"}
        }
        throw new Error("Não foi possível carregar informações da pessoa");
    }
}