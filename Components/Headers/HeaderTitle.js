import { View, Text, StyleSheet, Platform } from "react-native";
import { LogBox } from "react-native";
import React, { useState } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Icons from "../Icons/Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../../Context/ThemeContext";
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuIcon,
  DropdownMenuTitle,
} from "../Dropdowns/dropdown-menu";

const HeaderTitle = () => {
  const { setOptionModel, enableSelect, optionModel } = useTheme();
  //This is not a solution, it is only added temporarily while we look for how to resolve the issue.
  LogBox.ignoreLogs([
    "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined.",
  ]);

  const options = [
    {
      version: "3",
      title: "LLaMA-3",
      model: "meta-llama/Llama-3-8b-chat-hf",
      iconName: "sparkles",
      collectionName: "Ionicons",
      api: "together",
      url: "https://api.together.xyz/v1/chat/completions",
    },
    {
      version: "3.5",
      title: "ChatGPT 3.5",
      model: "gpt-3.5-turbo",
      iconName: "bolt",
      collectionName: "Ionicons",
      api: "openai",
      url: "https://api.openai.com/v1/chat/completions",
    },
    {
      version: "4",
      title: "ChatGPT 4",
      model: "gpt-4",
      iconName: "sparkles",
      collectionName: "Ionicons",
      api: "openai",
      url: "https://api.openai.com/v1/chat/completions",
    },
  ];

  const handleSelect = async (option) => {
    setOptionModel(option);
  };

  return (
    <View style={styles.menuContainer}>
      {/* <Menu>
        <MenuTrigger disabled={enableSelect}>
          <View className="flex-row items-center">
            <Text className="text-[16px]">
              {selectedOption || "Select action"}
            </Text>
            <Icons collection="Entypo" icon="chevron-right" size={20} />
          </View>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.menuOptions}>
          {options.map((option, index) => (
            <MenuOption
              key={option.version}
              onSelect={() => handleSelect(option)}
              style={{
                paddingHorizontal: 10,
                ...(Platform.OS === "ios"
                  ? {
                      borderBottomWidth: index % 2 === 0 ? 0 : 1,
                      borderTopWidth: index % 2 === 0 ? 0 : 1,
                      borderColor: "#D1D5DB",
                    }
                  : {}),
              }}
            >
              <View className="flex-row justify-between">
                <View className="flex-row w-[90%]">
                  {Platform.OS === "ios" ? (
                    <View className="w-[10%]">
                      {selectedOption === option.title && (
                        <Icons collection={"Entypo"} icon={"check"} size={20} />
                      )}
                    </View>
                  ) : (
                    <Icons
                      collection={option.collectionName}
                      icon={option.iconName.replace("-outline", "")}
                      size={20}
                      color={"#4B5563"}
                    />
                  )}
                  <View className="w-[95%] mx-2">
                    <Text className="text-[16px]">{option.title}</Text>
                  </View>
                </View>
                {Platform.OS === "android" ? (
                  <View className="w-[10%]">
                    {selectedOption === option.title && (
                      <Icons collection={"Entypo"} icon={"check"} size={20} />
                    )}
                  </View>
                ) : (
                  <Icons
                    collection={option.collectionName}
                    icon={option.iconName.replace("-outline", "")}
                    size={20}
                    color={"#4B5563"}
                  />
                )}
              </View>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu> */}
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              {optionModel.title || "Select action"}
            </Text>
          </View>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {options.map((option, index) => (
            <DropdownMenuItem
              disabled={enableSelect}
              onSelect={() => handleSelect(option)}
              textValue={option.title}
              key={index}
            >
              <DropdownMenuTitle>{option.title}</DropdownMenuTitle>
              <DropdownMenuIcon
                ios={{
                  name: option.icon,
                  pointSize: 18,
                }}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </View>
  );
};

const styles = StyleSheet.create({
  menuOptions: {
    marginTop: 30,
    paddingVertical: 5,
    width: "63%",
    backgroundColor: Platform.OS === "ios" ? "#FFF" : "#E5E7EB",
    borderRadius: Platform.OS === "ios" ? 15 : 5,
    marginRight: Platform.OS === "ios" ? "10%" : 0,
  },
  menuContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
});

export default HeaderTitle;
