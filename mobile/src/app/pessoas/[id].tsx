import { Header } from "@/components/Header";
import { servicePeople } from "@/service/service-peoples";
import { People, peopleSchema } from "@/types/people";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputCustom } from "@/components/InputCustom";
import { Button } from "@/components/Button";

interface LocalParams {
    id?: string;
}

export default function Page() {

    const people = useLocalSearchParams() as LocalParams;
    const { handleSubmit, control, formState: { errors }, reset } = useForm<People>({
        resolver: zodResolver(peopleSchema)
    });

    const isEdit = people.id !== "new";

    async function loadPeople() {
        try {
            //   setIsLoading(true);
            const response = await servicePeople.getByIdPeople(people.id!);
            if (!response.people) {
                // setStatusError({
                //   status: 404,
                //   message: "Pessoa não encontrada"
                // });
                return;
            }
            console.log(response.people);
            reset({
                ...response.people,
                birthDate: new Date(response.people.birthDate).toLocaleDateString()
            });
        } catch (error: any) {
            if (error) {
                // setStatusError({
                //   status: error.statusCode,
                //   message: error.message
                // });
                return;
            }
            //   setStatusError({
            //     status: error.response?.status || 500,
            //     message: error.response?.data?.message || "Erro ao carregar os dados da pessoa"
            //   });
        } finally {
            //   setIsLoading(false);
        }
    };

    function handleGoBackCancel() {
        router.back();
    }

    const onSubmit = useCallback(async (data: People) => {
        try {
            if (isEdit) {
                await servicePeople.updatePeople(people.id as string, data);
            } else {
                await servicePeople.createPeople(data);
            }
            alert(isEdit ? "Atualização feita com sucesso" : "Criação de uma nova pessoa feita com sucesso")
            router.back();
        } catch (error: any) {
            console.log("aqui ", error);
            if (error.statusCode) {
                alert(error.message)
                return;
            }
            alert("Não foi possivel criar uma nova pessoa, tente novamente!")
        }
    }, [])

    useEffect(() => {
        if (isEdit) {
            loadPeople();
        }
    }, [isEdit]);

    return (
        <View className='flex-1'>
            <Header
                title={isEdit ? "Editando Pessoa" : "Nova Pessoa"}
            />

            <View className="p-6 gap-4">
                <InputCustom
                    name="name"
                    control={control}
                    placeholderTextColor={"white"}
                    className="color-white"
                    placeholder="Nome"
                    error={errors.name?.message}
                />

                <InputCustom
                    name="email"
                    control={control}
                    placeholderTextColor={"white"}
                    className="color-white"
                    placeholder="Email"
                    error={errors.email?.message}
                />

                <InputCustom
                    name="cpf"
                    control={control}
                    placeholderTextColor={"white"}
                    className="color-white"
                    mask="cpf"
                    placeholder="CPF"
                    error={errors.cpf?.message}
                />

                <InputCustom
                    name="birthDate"
                    control={control}
                    placeholderTextColor={"white"}
                    className="color-white"
                    placeholder="Data de nascimento"
                    mask="birthDate"
                    error={errors.birthDate?.message}
                />

                <InputCustom
                    name="phone"
                    control={control}
                    placeholderTextColor={"white"}
                    className="color-white"
                    placeholder="Telefone"
                    mask="phone"
                    error={errors.phone?.message}
                />

                <InputCustom
                    name="address"
                    control={control}
                    placeholderTextColor={"white"}
                    className="color-white"
                    placeholder="Endereço"
                    error={errors.address?.message}
                />

                <InputCustom
                    name="city"
                    control={control}
                    placeholderTextColor={"white"}
                    className="color-white"
                    placeholder="Cidade"
                    error={errors.city?.message}
                />

                <InputCustom
                    name="state"
                    control={control}
                    placeholderTextColor={"white"}
                    className="color-white"
                    placeholder="Estado"
                    error={errors.state?.message}
                />
            </View>

            <View className="flex-row justify-center gap-6 items-center p-6">
                <Button
                    label="Cancelar"
                    variant="destructive"
                    onPress={handleGoBackCancel}
                />
                <Button
                    label="Salvar"
                    variant="secondary"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View>
    );
}