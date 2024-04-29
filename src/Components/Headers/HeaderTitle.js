import { View, Text } from "react-native";
import React from "react";
import ModalSelect from "../Modals/ModalSelect";

const HeaderTitle = ({ title = "chat" }) => {
  const options = [
    {
      version: "3.5",
      title: "GPT-3.5",
      model: "gpt-3.5-turbo",
      iconName: "flash-outline",
      collectionName: "Ionicons",
    },
    {
      version: "4",
      title: "GPT-4",
      model: "gpt-4",
      iconName: "sparkles-outline",
      collectionName: "Ionicons",
    },
    {
      version: "3",
      title: "LLaMA-3",
      model: "LLaMA-3 Chat (70B)",
      iconName: "sparkles-outline",
      collectionName: "Ionicons",
    },
  ];
  return (
    <View className="w-full flex-row mt-3 justify-center items-center">
      <View className="flex">
        <Text className="text-lg font-bold">{title}</Text>
      </View>
      <View className="w-[20%]">
        <ModalSelect options={options} />
      </View>
    </View>
  );
};

export default HeaderTitle;
