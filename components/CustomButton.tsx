import React from "react";
import { Button } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";

type CustomButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  deleteButton?: boolean;
};

export function CustomButton({ onPress, title, disabled, deleteButton=false }: CustomButtonProps) {
  const backgroundColor = useThemeColor({}, "buttonColor");
  const textColor = useThemeColor({}, "buttonText");

  return (
    <Button
      disabled={disabled}
      mode="contained"
      onPress={onPress}
      textColor={deleteButton ? "white" : textColor}
      buttonColor={deleteButton ? "red" : backgroundColor}
      contentStyle={{
        height: 55,
      }}
      style={{
        borderRadius: 6,
        width: 340,
        marginTop: 10,
        flex: 1,
      }}
    >
      {title}
    </Button>
  );
}
