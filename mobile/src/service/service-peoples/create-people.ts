import { api } from "@/service/api";
import { People } from "@/types/people";
import { AxiosError } from "axios";

export interface ResponseCreatePeople {
    peopleId: string
}

export async function serviceCreatePeople(data: People): Promise<ResponseCreatePeople> {
    try {
        const formattedData = {
            ...data,
            birthDate: data.birthDate.split('/').reverse().join('-')
        };
        const response = await api.post<{ peopleId: string }>(`/peoples`, formattedData);
        return response.data;
    } catch (error: any) {
        console.log("Erro ao criar pessoas:", error.status);
        if (error.status === 409) {
            throw { statusCode: 409, message: error.response.data.message}
        }
        throw new Error("Error ao criar pessoa")
    }
}