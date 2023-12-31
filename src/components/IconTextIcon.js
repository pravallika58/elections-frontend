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
import { darkTheme, lightTheme } from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";

const IconTextIcon = ({
  label,
  customContainerStyle,
  moreinfo,
  subHeading,
  subLabel,
  showTick,
  onPressHeart,
  showHeart,
  isLiked,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  return (
    <TouchableOpacity style={[styles.container, customContainerStyle]}>
      <Image
        source={imagePath.icShare}
        style={[
          styles.shareStyle,
          {
            tintColor: theme.textColor,
          },
        ]}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.labelStyle,
            {
              color: theme.textColor,
            },
          ]}
        >
          {label}
        </Text>
        {moreinfo && (
          <>
            <Text
              style={[
                styles.labelStyle,
                {
                  fontSize: textScale(10),
                  color: "#808080",
                  paddingTop: verticalScale(5),
                },
              ]}
            >
              {subLabel}
            </Text>
            <Text
              style={[
                styles.labelStyle,
                {
                  fontSize: textScale(10),
                  color: "#808080",
                },
              ]}
            >
              {subHeading}
            </Text>
          </>
        )}
      </View>
      {showTick && (
        <Image
          source={imagePath.icTick}
          style={[
            styles.shareStyle,
            {
              tintColor: theme.textColor,
            },
          ]}
        />
      )}
      {showHeart && (
        <TouchableOpacity onPress={onPressHeart}>
          {isLiked ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color={theme.textColor} />
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(24),
    marginTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    borderBottomWidth: 0.2,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shareStyle: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  labelStyle: {
    fontSize: textScale(16),
    fontWeight: "700",
    fontFamily: "C-Regular",
    color: "#000000",
    paddingLeft: scale(10),
  },
});

export default IconTextIcon;
