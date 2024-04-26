import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import Icons from "../Icons/Icon";

const ModalSelect = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Option 1", "Option 2"];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        className="items-start"
        onPress={() => setModalVisible(true)}
      >
        <Icons icon="right" collection="AntDesign" />
      </TouchableOpacity>
      <View className="flex-1 items-center justify-center">
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="mt-[50px] w-[60%] bg-red-500 rounded-lg items-center shadow-lg">
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className="p-1 w-full my-2 border-b-2 border-cyan-400"
                onPress={() => handleSelect(option)}
              >
                <Text className="text-center text-black">{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
        <Text className="mt-4 text-lg">Selected Option: {selectedOption}</Text>
      </View>
    </View>
  );
};

export default ModalSelect;
