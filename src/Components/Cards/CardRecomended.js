import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CardRecomended = ({ title, description, setInputText }) => {
  return (
    <TouchableOpacity
      onPress={() => setInputText(description)}
      className="bg-gray-100 py-2 px-4 w-[250px] h-[70px] rounded-lg mx-2"
    >
      <Text className="text-lg text-black font-semibold">{title}</Text>
      <Text className="text-sm text-gray-400">{description}</Text>
    </TouchableOpacity>
  );
};

export default CardRecomended;
