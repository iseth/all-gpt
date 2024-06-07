import React from "react";
import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Icons from "../Icons/Icon";

const Messages = ({ messages, scrollViewRef }) => {
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  });

  return (
    <ScrollView
      scrollEnabled={messages.length > 0 ? true : false}
      ref={scrollViewRef}
      contentInsetAdjustmentBehavior="automatic"
      className={`flex-1 mx-[16px]`}
    >
      {messages.length > 0 ? (
        messages.map((message, index) =>
          message.role === "user" ? (
            <View key={index}>
              <View className={`self-end my-[32px]`}>
                <Text
                  className={`bg-[#F2F2F2] px-2 py-1 rounded-[16px] text-base text-black`}
                >
                  {message.content}
                </Text>
              </View>
            </View>
          ) : (
            <View key={index} className="flex-row">
              {messages[index - 1].role === "user" ? (
                <View className="w-[10%]">
                  <Icons
                    icon="dot-circle-o"
                    collection="FontAwesome"
                    size={25}
                  />
                </View>
              ) : (
                <View className="w-[10%]" />
              )}
              <Text key={index} className={`text-base text-black flex-wrap`}>
                {message.content}
              </Text>
            </View>
          )
        )
      ) : (
        <Pressable className="items-center mt-[50%]">
          <View className="bg-black w-[60px] h-[60px] rounded-full" />
        </Pressable>
      )}
    </ScrollView>
  );
};

const CardRecomended = ({ title, description, setInputText }) => {};

export { Messages };
[{}, {}, {}];
