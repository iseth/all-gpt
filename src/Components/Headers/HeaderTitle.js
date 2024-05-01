import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ModalSelect from "../Modals/ModalSelect";
import { Picker } from "@react-native-picker/picker";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

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
    <MenuProvider style={{ width: 150, height: 44 }}>
      <View className="w-full">
        <Menu>
          <MenuTrigger text="Select action" />
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Save`)} text="Save" />
            <MenuOption onSelect={() => alert(`Delete`)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => alert(`Not called`)}
              disabled={true}
              text="Disabled"
            />
          </MenuOptions>
        </Menu>
      </View>
    </MenuProvider>
  );
};

export default HeaderTitle;
