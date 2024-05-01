import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ModalSelect from "../Modals/ModalSelect";
import { Picker } from "@react-native-picker/picker";

const HeaderTitle = () => {
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
  const [selectedModel, setSelectedModel] = useState();

  useEffect(() => {
    if (selectedModel) {
      console.log(selectedModel);
    }
  }, [selectedModel]);

  return (
    <View className="w-full">
      <Picker
        mode="dropdown"
        selectedValue={selectedModel}
        style={{ width: 150, height: 44 }}
        itemStyle={{ fontSize: 12 }}
        onValueChange={(itemValue, itemIndex) => setSelectedModel(itemValue)}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.title} value={option.model} />
        ))}
      </Picker>
    </View>
  );
};

export default HeaderTitle;
