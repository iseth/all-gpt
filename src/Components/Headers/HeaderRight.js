import { TouchableOpacity } from "react-native";
import React from "react";
import Icons from "../Icons/Icon";
import { useTheme } from "../../Context/ThemeContext";

const HeaderRight = () => {
  const { setRefresh } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => setRefresh(true)}
      className="w-full items-end mr-2"
    >
      <Icons icon="new-message" collection="Entypo" size={20} color="#D1D5DB" />
    </TouchableOpacity>
  );
};

export default HeaderRight;
