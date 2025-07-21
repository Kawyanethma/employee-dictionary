import { useThemeColor } from "@/hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TextInput, View } from "react-native";
import { IconButton } from "@/components/IconButton";

type IconTextInputProps = {
  text: string;
  placeholder?: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  keyboardType?: "default" | "numeric";
  
  icon: React.ComponentProps<typeof Feather>["name"];
};

export function IconTextInput({
  text,
  setText,
  icon,
  placeholder = "search",
  keyboardType = "default",
}: IconTextInputProps) {
  const backgroundColor = useThemeColor({}, "mainColor");
  const textColor = useThemeColor({}, "text");
  return (
    <View style={[styles.inputContainer, { backgroundColor }]}>
      <TextInput
        style={[styles.textInput, { backgroundColor, color: textColor }]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={icon === "arrow-right"}
        maxLength={icon === "arrow-right" ? 4 : undefined}
        placeholderTextColor={textColor}
        value={text}
        onChangeText={setText}
      />
      {icon === "search" && text.length > 0 ? (
        <IconButton icon="x" onPress={() => setText("")} />
      ) : (
        <Feather name={icon} size={25} color={textColor} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
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
