import { View, Text } from "react-native";
import React from "react";
import ModalSelect from "../Modals/ModalSelect";

const HeaderTitle = ({ title = "chat", options }) => {
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
