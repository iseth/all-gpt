import { View, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "../Icons/Icon";

const ButtonAdd = ({ handleOptions }) => {
  return (
    <TouchableOpacity
      className="rounded-full h-[30px] w-[30px] p-[3px] bg-gray-100"
      onPress={handleOptions}
    >
      <View className="justify-center items-center">
        <Icons
          icon="add"
          collection="MaterialIcons"
          size={25}
          color="#6B7280"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonAdd;
