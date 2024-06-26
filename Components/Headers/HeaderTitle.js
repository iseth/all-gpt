import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Icons from "../Icons/Icon";

const HeaderTitle = () => {
  const [selectedOption, setSelectedOption] = useState("GPT-3.5");

  const options = [
    {
      version: "3.5",
      title: "ChatGPT 3.5",
      model: "gpt-3.5-turbo",
      iconName: "flash-outline",
      collectionName: "Ionicons",
    },
    {
      version: "4",
      title: "ChatGPT 4",
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

  const handleSelect = (title) => {
    setSelectedOption(title);
  };

  return (
    <View style={styles.menuContainer}>
      <Menu>
        <MenuTrigger>
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
              onSelect={() => handleSelect(option.title)}
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
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuOptions: {
    marginTop: 30,
    paddingVertical: 5,
    width:'63%',
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
