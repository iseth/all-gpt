import { Link, router } from "expo-router";
import { FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { defaultStyles } from "../../constants/Styles";

const Settings = () => {

  const items = [{ title: "API Keys" }];
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
              <Link href="settings/api-keys" asChild>
                <Pressable style={defaultStyles.item}>
                  <Text>{item.title}</Text>
                  <Text style={{ fontSize: 18, flex: 1 }}>{item.name}</Text>
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
export default Settings;
