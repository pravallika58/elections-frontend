import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../constants/responsiveSizes";
import imagePath from "../constants/imagePath";
import colors from "../constants/colors";

const Header = ({
  label,
  showRightArrow,
  onPressArrow,
  customLabelStyle,
  customHeaderContainer,
  location,
  locationText,
}) => {
  return (
    <View style={[styles.headerContainer, customHeaderContainer]}>
      {showRightArrow ? (
        <TouchableOpacity onPress={onPressArrow} activeOpacity={0.8}>
          <Image
            source={imagePath.icRightArrow}
            style={styles.rightArrowStyle}
          />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={[styles.labelStyle, customLabelStyle]}>{label}</Text>
        {location ? (
          <Text
            style={{
              fontSize: textScale(14),
              fontFamily: "C-Regular",
              textAlign: "center",
              color: colors.black,
            }}
          >
            {locationText}
          </Text>
        ) : null}
      </View>
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
