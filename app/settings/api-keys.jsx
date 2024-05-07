import { Link, router } from "expo-router";
import { FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";

import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";
import Icons from "../../Components/Icons/Icon";

const ApiKeys = () => {
  const items = [
    { title: "Open AI", api: "openai" },
    { title: "Together", api: "together" },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={defaultStyles.block}>
          <FlatList
            scrollEnabled={false}
            data={items}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <Link href={`settings/update/${item.api}`} asChild>
                <Pressable style={defaultStyles.item}>
                  <Text>{item.title}</Text>
                  <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
                  <View className="flex-row">
                    <View className="mx-[1px]">
                      <Icons
                        icon="dots-three-horizontal"
                        collection="Entypo"
                        size={25}
                      />
                    </View>
                    <View className="mx-[1px]">
                      <Icons
                        icon="dots-three-horizontal"
                        collection="Entypo"
                        size={25}
                      />
                    </View>
                    <View className="mx-[1px]">
                      <Icons
                        icon="dots-three-horizontal"
                        collection="Entypo"
                        size={25}
                      />
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.gray}
                  />
                </Pressable>
              </Link>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default ApiKeys;
