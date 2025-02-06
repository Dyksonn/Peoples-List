import { api } from "@/service/api";

export interface ResponseDeletePeople {
    message: string
}

export async function serviceDeletePeople(id: string) {
    try {
        const response = await api.delete<ResponseDeletePeople>(`/peoples/${id}`);
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar pessoas:", error);
        throw new Error("Não foi possível carregar informações da pessoa");
    }
}