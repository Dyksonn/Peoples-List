import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler"

import "@/styles/global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function LayoutApp() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="flex-1 bg-gray-900">
                <Slot />
            </SafeAreaView>
            <StatusBar barStyle="light-content"/>
        </GestureHandlerRootView>
    );
};