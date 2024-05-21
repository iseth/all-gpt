import { View, Text, TextInput, Platform, Pressable } from "react-native";
import React from "react";

import Icons from "../Icons/Icon";

const InputPrompt = ({
  inputText,
  setInputText,
  placeholder = "Message",
  handleSend,
}) => {
  return (
    <View
      className={`flex-row flex-1 mr-[16px] ml-[11px] ${
        Platform.OS === "ios" ? "bg-[#F2F2F2]" : "bg-[#F2F2F2]"
      } rounded-full`}
    >
      <TextInput
        className={`flex-1 mr-2.5 px-4 py-2.5 text-base`}
        value={inputText}
        onChangeText={setInputText}
        placeholder={placeholder}
        returnKeyType="send"
      />
      <View className="items-center justify-center">
        <View className="mr-[9px]">
          {inputText.length > 0 ? (
            <Pressable
              onPress={handleSend}
              className="bg-black rounded-full p-1"
            >
              <Icons
                icon="arrowup"
                collection="AntDesign"
                size={20}
                color="white"
              />
            </Pressable>
          ) : (
            <Icons
              icon="mic"
              collection="MaterialIcons"
              size={25}
              color="#7E7F84"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default InputPrompt;
