import {
  View,
  Text,
  StyleSheet,
  Image,
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
import imagePath from "../constants/imagePath";
import colors, { darkTheme, lightTheme } from "../constants/colors";
import { Feather } from "@expo/vector-icons";

const Header = ({
  label,
  showRightArrow,
  onPressArrow,
  customLabelStyle,
  customHeaderContainer,
  location,
  locationText,
  showRightIcon,
  onPressEdit,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  return (
    <View style={[styles.headerContainer, customHeaderContainer]}>
      {showRightArrow ? (
        <TouchableOpacity onPress={onPressArrow} activeOpacity={0.8}>
          <Image
            source={imagePath.icRightArrow}
            style={[
              styles.rightArrowStyle,
              {
                tintColor: theme.textColor,
              },
            ]}
          />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={[
            styles.labelStyle,
            customLabelStyle,
            {
              color: theme.textColor,
            },
          ]}
        >
          {label}
        </Text>
        {location ? (
          <Text
            style={{
              fontSize: textScale(14),
              fontFamily: "C-Regular",
              textAlign: "center",
              color: theme.textColor,
            }}
          >
            {locationText}
          </Text>
        ) : null}
      </View>

      {showRightIcon ? (
        <TouchableOpacity activeOpacity={0.8} onPress={onPressEdit}>
          <Feather name="edit" size={30} color={theme.textColor} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(16),
    flexDirection: "row",
    alignItems: "center",
  },
  rightArrowStyle: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
  labelStyle: {
    fontSize: textScale(48),
    fontFamily: "C-Regular",
    textAlign: "center",
  },
});

export default Header;
