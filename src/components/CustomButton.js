import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../constants/responsiveSizes";
import colors from "../constants/colors";

const CustomButton = ({ customStyles, label, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.buttonContainer, customStyles]}
    >
      <Text style={styles.labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.buttonBackground,
    borderRadius: moderateScale(24),
    padding: moderateScale(9),
    marginHorizontal: scale(24),
    marginTop: verticalScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  labelStyle: {
    fontSize: textScale(18),
    fontFamily: "C-Regular",
    color: colors.white,
  },
});

export default CustomButton;
