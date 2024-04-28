import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "../Icons/Icon";

const ButtonAdd = ({ handleOptions }) => {
  return (
    <View className="items-center justify-center mx-1">
      <TouchableOpacity
        className="items-center justify-center rounded-full h-[25px]"
        onPress={handleOptions}
      >
        <Icons
          icon="add"
          collection="MaterialIcons"
          size={25}
          color="#6B7280"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAdd;
