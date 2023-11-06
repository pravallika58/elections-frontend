import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { scale } from "../constants/responsiveSizes";
import { darkTheme, lightTheme } from "../constants/colors";
import navigationStrings from "../constants/navigationStrings";

const SearchHeader = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={styles.flexDirec}>
      <Text
        style={[
          styles.textStyle,
          {
            color: theme.textColor,
          },
        ]}
      >
        Elections
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(navigationStrings.SEARCH)}
      >
        <AntDesign name="search1" size={30} color={theme.textColor} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  flexDirec: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
  },
  textStyle: {
    fontSize: scale(24),
    fontWeight: "bold",
    fontFamily: "C-Regular",
  },
});
