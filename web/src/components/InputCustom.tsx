import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { formatbirthDate, formatCpf, formatPhone } from "@/utils/formats";

interface InputCustomProps extends InputHTMLAttributes<HTMLInputElement> {
  mask?: 'cpf' | 'birthDate' | 'phone';
  error?: string;
  register?: UseFormRegisterReturn;
}

export function InputCustom({ mask, error, register, className, ...rest }: InputCustomProps) {
  const handleMask = (value: string) => {
    switch (mask) {
      case 'cpf':
        return formatCpf(value);
      case 'birthDate':
        return formatbirthDate(value);
      case 'phone':
        return formatPhone(value);
      default:
        return value;
    }
  };

  return (
    <div>
      <input
        {...register}
        {...rest}
        className={`w-full p-2 bg-gray-700 rounded ${className}`}
        onChange={(e) => {
          if (mask) {
            e.target.value = handleMask(e.target.value);
          }
          register?.onChange(e);
        }}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
} 