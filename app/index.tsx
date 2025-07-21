import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useState } from "react";
import { EmployeeList } from "@/components/EmployeeList";
import { IconTextInput } from "@/components/IconTextInput";

export default function HomeScreen() {
  const [search, setSearch] = useState<string>("");

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <SafeAreaView style={styles.container}>
        <IconTextInput search={search} setSearch={setSearch} icon="search" />
        <EmployeeList search={search} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        ></View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
    paddingHorizontal: 16,
    marginVertical: 15,
    marginHorizontal: 22,
  },
  textInput: {
    height: 55,
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
});
