import { api } from "@/service/api";
import { People } from "@/types/people";

export interface ResponseListAllPeoples {
    peoples: People[]
}

export async function serviceListAllPeoples(): Promise<ResponseListAllPeoples> {
    try {
        const response = await api.get<ResponseListAllPeoples>("/peoples");
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar pessoas:", error);
        throw new Error("Não foi possível carregar a lista de pessoas");
    }
}