import { Text, View } from "react-native"

type Props = {
  name: string
  email: string
}

export function Card(props: Props) {
  return (
    <View className="h-16 bg-[#1D1F27] rounded-md px-4 justify-center">
      <Text className="text-lg font-semibold text-white">{props.name}</Text>
      <Text className="text-base text-[#81868D]">{props.email}</Text>
    </View>
  )
}