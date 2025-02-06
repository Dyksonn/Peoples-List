import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { Button } from "./Button";

interface HeaderProps extends TextInputProps {
    search?: boolean;
    onSearch?: (value: string) => void;
    title?: string;
}

export function Header({ search, title, onSearch, ...rest }: HeaderProps) {

    function handleGoBack(){ 
        router.back();
    }

    function handleToCreatePeople() {
        router.push("/pessoas/new");
    }

    if (search) {
        return (
            <View className="p-4 gap-5 px-5 justify-between items-center flex-row">
                <View
                    className="h-14 bg-slate-500 flex-1 flex-row items-center px-4 rounded-lg p-2"
                >
                <TextInput 
                    className="text-white flex-1 p-2"
                    onChangeText={onSearch}
                    {...rest}
                />
                <View>
                    <Ionicons name="search" size={24} color="white" />
                </View>
                </View>

                <View>
                    <Button 
                        label="Criar" 
                        variant="secondary" 
                        className="h-14"
                        onPress={handleToCreatePeople}
                    />
                </View>
            </View>
        )
    }

    return (
        <View className="justify-center items-center bg-gray-800 p-4">
            <Pressable onPress={handleGoBack} className="absolute left-4">
                <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Text className="color-white text-xl">{title ?? "Header Text"}</Text>
        </View>
    );
}