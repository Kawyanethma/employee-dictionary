import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, TextInput } from "react-native";

type FormTextInputProps = {
  ref?: React.Ref<TextInput>;
  keyboardType?: "default" | "numeric";
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  showSoftInputOnFocus?: boolean;
  onFocus?: () => void;
  disabled?: boolean;
};

export function FormTextInput({
  ref,
  keyboardType = "default",
  placeholder = "Enter text",
  value = "",
  onChange,
  showSoftInputOnFocus = true,
  onFocus,
  disabled = false,
}: FormTextInputProps) {
  const backgroundColor = useThemeColor({}, "mainColor");
  const textColor = useThemeColor({}, "text");
  return (
    <TextInput
      ref={ref ? ref : undefined}
      keyboardType={keyboardType}
      placeholder={placeholder}
      style={[styles.input, { backgroundColor: disabled ? "lightgray" : backgroundColor, color: disabled ? "darkgray" : textColor }]}
      value={value}
      onChangeText={onChange}
      onFocus={onFocus ? onFocus : undefined}
      showSoftInputOnFocus={showSoftInputOnFocus}
      editable={!disabled}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    height: 50,
    borderRadius: 6,
    marginVertical: 10,
    
  },
});
