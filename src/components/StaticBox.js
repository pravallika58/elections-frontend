import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { moderateScale, scale, textScale } from "../constants/responsiveSizes";
import { darkTheme, lightTheme } from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";

const StaticBox = ({ label, onPress, time }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.inputContainer,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={styles.labelStyle}>{label}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        {time ? (
          <AntDesign name="clockcircleo" size={24} color={theme.textColor} />
        ) : (
          <AntDesign name="calendar" size={24} color={theme.textColor} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default StaticBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(170),
    borderRadius: moderateScale(24),
    padding: moderateScale(9),
    marginLeft: scale(16),
  },
  labelStyle: {
    fontSize: textScale(16),
    fontFamily: "C-Regular",
    paddingLeft: scale(4),
  },
});
