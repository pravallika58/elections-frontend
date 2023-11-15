import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React from "react";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../constants/responsiveSizes";
import colors, { darkTheme, lightTheme } from "../constants/colors";

const CustomButton = ({
  customStyles,
  label,
  onPress,
  isLoading,
  disabled,
  labelStyle,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: theme.buttonBackground,
        },
        customStyles,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size={"small"} color={colors.white} />
      ) : (
        <Text
          style={[
            styles.labelStyle,
            {
              color: colors.white,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
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
