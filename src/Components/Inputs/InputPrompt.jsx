import { View, Text, TextInput } from "react-native";
import React from "react";
import Icons from "../Icons/Icon";

const InputPrompt = ({
  inputText,
  setInputText,
  placeholder = "Message",
  sizeIcon = 25,
  colorIcon = "#6B7280",
  collectionIcon = "MaterialIcons",
  iconName = "mic",
}) => {
  return (
    <View className="flex-row flex-1 border border-gray-200 rounded-full">
      <TextInput
        className={`flex-1 mr-2.5 px-4 py-2.5 text-base`}
        value={inputText}
        onChangeText={setInputText}
        placeholder={placeholder}
        returnKeyType="send"
      />
      {inputText.length === 0 && (
        <View className="justify-center mr-4">
          <Icons
            icon={iconName}
            collection={collectionIcon}
            size={sizeIcon}
            color={colorIcon}
          />
        </View>
      )}
    </View>
  );
};

export default InputPrompt;
