import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Icons from "../Icons/Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModalSelect = ({options}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].version);

  const handleSelect = (version, model) => {
    setSelectedOption(version);
    saveModel(model);
    setModalVisible(false);
  };

  const saveModel = async (model) => {
    await AsyncStorage.setItem("ModelOpenai", model);
  };

  useEffect(() => {
    saveModel(options[0].model);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <TouchableOpacity
          className="mt-1 mx-1 w-[35px]"
          onPress={() => setModalVisible(true)}
        >
          <Text>
            {selectedOption}
            <Icons icon="right" collection="AntDesign" />
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {options.map((option, index) => (
                <TouchableOpacity
                  className={
                    index % 2 === 0 ? "border-b-[1px] border-gray-200" : ""
                  }
                  key={index}
                  style={styles.optionStyle}
                  onPress={() => handleSelect(option.version, option.model)}
                >
                  <View className="flex-row justify-between">
                    <View className="flex-row">
                      <View className="w-[20%]">
                        {option.version === selectedOption && (
                          <Icons icon="check" collection="Entypo" size={20} />
                        )}
                      </View>
                      <View className="w-[51%]">
                        <Text style={styles.optionText}>{option.title}</Text>
                      </View>
                    </View>
                    <Icons
                      icon={option.iconName}
                      collection={option.collectionName}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  modalView: {
    width: "50%", // Adjust the width of the modal
    backgroundColor: "white",
    borderRadius: 20,
    padding: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%", // Ensure full width to align text in the center
  },
  optionText: {
    textAlign: "left",
    color: "black",
  },
});

export default ModalSelect;
