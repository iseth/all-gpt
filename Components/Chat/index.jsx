import React from "react";
import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

const Messages = ({ messages, scrollViewRef }) => {
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  });

  return (
    <ScrollView
      scrollEnabled={messages.length > 0 ? true : false}
      ref={scrollViewRef}
      contentInsetAdjustmentBehavior="automatic"
      className={`flex-1`}
    >
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <View key={index} className={`ml-3.5`}>
            {message.role && (
              <Text className={`text-xs`}>{message.role.toUpperCase()}</Text>
            )}
            <View
              className={`rounded-full max-w-5/6 self-start ${
                message.role === "user" ? "self-start" : ""
              }`}
            >
              <Text className={`text-base text-black`}>{message.content}</Text>
            </View>
          </View>
        ))
      ) : (
        <Pressable className="justify-center items-center h-screen">
          {/* <Text>update api key.</Text> */}
        </Pressable>
      )}
    </ScrollView>
  );
};

const CardRecomended = ({ title, description, setInputText }) => {};

export { Messages };
