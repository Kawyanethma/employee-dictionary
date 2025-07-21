import { useThemeColor } from "@/hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TextInput, View } from "react-native";
import { IconButton } from "@/components/IconButton";

type IconTextInputProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  icon: React.ComponentProps<typeof Feather>["name"];
};

export function IconTextInput({ search, setSearch, icon }: IconTextInputProps) {
  const backgroundColor = useThemeColor({}, "mainColor");
  const textColor = useThemeColor({}, "text");
  return (
    <View style={[styles.inputContainer, { backgroundColor }]}>
      <TextInput
        style={[styles.textInput, { backgroundColor, color: textColor }]}
        placeholder="Search"
        keyboardType="default"
        placeholderTextColor={textColor}
        value={search}
        onChangeText={setSearch}
      />
      {icon === "search" && search.length > 0 ? (
        <IconButton icon="x" onPress={() => setSearch("")} />
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
