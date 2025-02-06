import React from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import { BlurView } from "expo-blur"

type Props = {
  visible: boolean
  onCancel: () => void
  onDelete: () => void
  title: string
  message: string
}

export function ModalConfirmDelete({ visible, onCancel, onDelete, title, message }: Props) {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <BlurView intensity={50} className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-lg p-6 w-11/12 max-w-md">
          <Text className="text-xl font-bold mb-4">{title}</Text>
          <Text className="text-base text-gray-700 mb-6">{message}</Text>
          <View className="flex-row justify-end">
            <TouchableOpacity onPress={onCancel} className="mr-4">
              <Text className="text-base text-blue-500">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Text className="text-base text-red-500">Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  )
}
