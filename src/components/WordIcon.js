import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { scale, textScale, verticalScale } from "../constants/responsiveSizes";
import colors from "../constants/colors";
import imagePath from "../constants/imagePath";

const WordIcon = ({ title, label, onPress, customSubTitle }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.barContainer}>
        <Text style={[styles.labelStyle, customSubTitle]}>{label}</Text>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.subTitle}>{title}</Text>
        </View>
        <Image source={imagePath.icLeftArrow} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: verticalScale(15),
    borderBottomWidth: 0.5,
    paddingHorizontal: scale(20),
    borderColor: "grey",
    marginTop: verticalScale(26),
  },
  labelStyle: {
    fontSize: textScale(16),
    fontWeight: "700",
    color: colors.black,
    fontFamily: "C-Regular",
  },
  subTitle: {
    fontSize: textScale(16),
    fontWeight: "700",
    color: colors.black,
    fontFamily: "C-Regular",
    textAlign: "right",
  },
  iconStyle: {
    width: scale(40),
    height: verticalScale(40),
  },
});

export default WordIcon;
