import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { formatbirthDate, formatCpf, formatPhone } from '@/utils/formats';
import clsx from 'clsx';
import { People } from '@/types/people';

interface InputCustomProps extends TextInputProps {
  mask?: 'cpf' | 'birthDate' | 'phone';
  error?: string;
  control: Control<People, any>;
  name: keyof People;
  className?: string;
}

export function InputCustom({ mask, error, control, name, className, ...rest }: InputCustomProps) {
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
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...rest}
            className={clsx('w-full p-2 bg-gray-700 rounded h-12', className)}
            placeholderTextColor={"white"}
            onBlur={onBlur}
            onChangeText={(text) => {
              if (mask) {
                text = handleMask(text);
              }
              onChange(text);
            }}
            value={value}
          />
        )}
      />
      {error && <Text style={{ color: '#EF4444', fontSize: 12 }}>{error}</Text>}
    </View>
  );
}