"use client"
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { People, peopleSchema } from "@/types/people";
import { useState, useEffect } from "react";
import { InputCustom } from "@/components/InputCustom";
import { servicePeople } from "@/service/service-peoples";
import { useRouter, useParams } from "next/navigation";
import { StatusMessage } from "@/components/StatusMessage";

interface statusErroProps {
  status: number;
  message: string;
}

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<People>({
    resolver: zodResolver(peopleSchema)
  });
  const [statusError, setStatusError] = useState<statusErroProps | null>(null)

  const isEditing = params.id !== "new";

  useEffect(() => {
    if (isEditing) {
      loadPerson();
    }
  }, [isEditing]);

  const loadPerson = async () => {
    try {
      setIsLoading(true);
      const response = await servicePeople.getByIdPeople(params.id as string);
      if (!response.people) {
        setStatusError({
          status: 404,
          message: "Pessoa não encontrada"
        });
        return;
      }
      reset({
        ...response.people,
        birthDate: new Date(response.people.birthDate).toLocaleDateString()
      });
    } catch (error: any) {
      console.log("aqui ", error)
      if (error) {
        setStatusError({
          status: error.statusCode,
          message: error.message
        });
        return;
      }
      setStatusError({
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao carregar os dados da pessoa"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = useCallback(async (data: People) => {
    try {
      setIsLoading(true);
      if (isEditing) {
        await servicePeople.updatePeople(params.id as string, data);
      } else {
        await servicePeople.createPeople(data);
      }
      alert(isEditing ? "Atualização feita com sucesso" : "Criação de uma nova pessoa feita com sucesso")
      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.log("aqui ", error);
      if (error.statusCode) {
        alert(error.message)
        return;
      }
      alert("Não foi possivel criar uma nova pessoa, tente novamente!")
    } finally {
      setIsLoading(false);
    }
  }, [])

  if (statusError !== null) {
    return <StatusMessage
      isVisible
      status={statusError.status}
      message={statusError.message}
      onClose={() => router.push("/")}
    />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="container mx-auto p-8">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            {isEditing ? "Editar Pessoa" : "Criar Nova Pessoa"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputCustom
              placeholder="Nome"
              register={register("name")}
              error={errors.name?.message}
            />

            <InputCustom
              placeholder="E-mail"
              register={register("email")}
              disabled={isEditing ? true : false}
              error={errors.email?.message}
            />

            <InputCustom
              placeholder="CPF"
              register={register("cpf")}
              disabled={isEditing ? true : false}
              error={errors.cpf?.message}
              mask="cpf"
              maxLength={14}
            />

            <InputCustom
              placeholder="Data de nascimento"
              register={register("birthDate")}
              error={errors.birthDate?.message}
              mask="birthDate"
              maxLength={10}
            />

            <InputCustom
              placeholder="Telefone"
              register={register("phone")}
              error={errors.phone?.message}
              mask="phone"
              maxLength={15}
            />

            <InputCustom
              placeholder="Endereço"
              register={register("address")}
              error={errors.address?.message}
            />

            <InputCustom
              placeholder="Cidade"
              register={register("city")}
              error={errors.city?.message}
            />

            <InputCustom
              placeholder="Estado"
              register={register("state")}
              error={errors.state?.message}
            />

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {isLoading ? "Salvando..." : (isEditing ? "Atualizar" : "Criar")}
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 