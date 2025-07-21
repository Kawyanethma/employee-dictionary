import {
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { EmployeeList } from "@/components/EmployeeList";
import { IconTextInput } from "@/components/IconTextInput";
import { CustomButton } from "@/components/CustomButton";
import { RandomQuote } from "@/components/RandomQuote";
import { useRouter } from "expo-router";
import { Divider } from "react-native-paper";

export default function HomeScreen() {
  const [search, setSearch] = useState<string>("");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <SafeAreaView style={styles.container}>
        <IconTextInput text={search} setText={setSearch} icon="search" />
        <Divider style={{ marginHorizontal: 25, marginVertical: 5, backgroundColor: "black", borderWidth: 1 }} />
        <RandomQuote />
        <EmployeeList search={search} />
        <View
          style={[
            styles.buttonContainer,
            { marginBottom: Platform.OS === "android" ? insets.bottom : 0 },
          ]}
        >
          <CustomButton
            onPress={() => router.navigate("/home/addEmployee")}
            title="Add new Employee"
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
