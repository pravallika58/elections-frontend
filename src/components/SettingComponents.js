import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../constants/responsiveSizes";
import colors, { darkTheme, lightTheme } from "../constants/colors";

const SettingComponents = ({
  title,
  label1,
  label2,
  onPressLabel1,
  onPressLabel2,
  label1Key,
  label2Key,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.titleStyle,
          {
            color: theme.textColor,
          },
        ]}
      >
        {title}
      </Text>
      <View
        style={[
          styles.switchContainer,
          {
            backgroundColor: theme.backgroundColor,
          },
        ]}
      >
        <TouchableOpacity
          onPress={onPressLabel1}
          activeOpacity={0.8}
          style={[
            styles.container1,
            {
              backgroundColor: label1Key
                ? theme.buttonBackground
                : colors.white,
            },
          ]}
        >
          <Text
            style={[
              styles.labelStyle,
              {
                color: label1Key ? colors.white : colors.black,
              },
            ]}
          >
            {label1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressLabel2}
          activeOpacity={0.8}
          style={[
            styles.container2,
            {
              backgroundColor: label2Key
                ? theme.buttonBackground
                : colors.white,
            },
          ]}
        >
          <Text
            style={[
              styles.labelStyle,
              {
                color: label2Key ? colors.white : colors.black,
              },
            ]}
          >
            {label2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(26),
    marginHorizontal: scale(18),
  },
  titleStyle: {
    fontSize: textScale(16),
    fontWeight: "700",
    color: colors.black,
    fontFamily: "C-Regular",
  },
  switchContainer: {
    height: moderateScale(27),
    width: moderateScale(294),
    backgroundColor: colors.white,
    borderRadius: moderateScale(48),
    marginTop: verticalScale(16),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container1: {
    height: moderateScale(27),
    width: moderateScale(146),
    backgroundColor: colors.buttonBackground,
    borderTopLeftRadius: moderateScale(48),
    borderBottomLeftRadius: moderateScale(48),
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    height: moderateScale(27),
    width: moderateScale(146),
    backgroundColor: colors.buttonBackground,
    borderTopRightRadius: moderateScale(48),
    borderBottomRightRadius: moderateScale(48),
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    fontSize: textScale(16),
    fontWeight: "700",
    color: colors.white,
    fontFamily: "C-Regular",
  },
});

export default SettingComponents;
