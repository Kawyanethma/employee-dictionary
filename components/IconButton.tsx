import React from "react";
import { TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";

export function IconButton({
  icon,
  onPress,
}: {
  icon: React.ComponentProps<typeof Feather>["name"];
  onPress: () => void;
}) {
  const textColor = useThemeColor({}, "text");
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name={icon} size={25} color={textColor} />
    </TouchableOpacity>
  );
}
