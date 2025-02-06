import { z } from "zod";
import { cpf } from 'cpf-cnpj-validator'; 

export const peopleSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  cpf: z.string()
    .refine((value) => cpf.isValid(value), {
      message: "CPF inválido"
    }),
  state: z.string().length(2, "Estado deve ter 2 caracteres"),
  birthDate: z.string().nonempty("Data de nascimento é obrigatória"),
  phone: z.string().nonempty("Telefone é obrigatório"),
  address: z.string().nonempty("Endereço é obrigatório"),
  city: z.string().nonempty("Cidade é obrigatória"),
});

export type People = z.infer<typeof peopleSchema> & {
  id: string;
}; 