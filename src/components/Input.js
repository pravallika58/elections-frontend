import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../constants/responsiveSizes";
import colors from "../constants/colors";

const Input = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  onChangeText,
  value,
  styleInput,
  multiline,
  label,
  customContainerStyle,
  onFocus,
}) => {
  return (
    <View style={[styles.container, customContainerStyle]}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        multiline={multiline}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        style={[styles.inputStyle, styleInput]}
        onFocus={onFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(16),
  },
  inputStyle: {
    fontSize: textScale(16),
    fontFamily: "C-Regular",
    backgroundColor: colors.white,
    borderRadius: moderateScale(24),
    padding: moderateScale(9),
    color: colors.black,
  },
  labelStyle: {
    fontSize: textScale(20),
    fontFamily: "C-Regular",
    color: colors.black,
    fontWeight: "700",
    paddingBottom: verticalScale(10),
    paddingLeft: scale(4),
  },
});

export default Input;
