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

import { CustomButton } from "@/components/CustomButton";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { IconTextInput } from "@/components/IconTextInput";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [pin, setPin] = useState<string>("");
  const { login } = useAuth();

  const handleLogin = () => {
    if (pin.length === 4) {
      Keyboard.dismiss();
      login(pin);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <SafeAreaView style={styles.container}>
        <IconTextInput
          text={pin}
          setText={setPin}
          keyboardType="numeric"
          icon="arrow-right"
          placeholder="Enter your PIN"
        />

        <View
          style={[
            styles.buttonContainer,
            { marginBottom: Platform.OS === "android" ? insets.bottom : 0 },
          ]}
        >
          <CustomButton onPress={handleLogin} title="Login" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight ?? 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 30,
  },
});
