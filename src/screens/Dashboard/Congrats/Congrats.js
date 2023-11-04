import { View, Text, useColorScheme, Image } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import { darkTheme, lightTheme } from "../../../constants/colors";
import imagePath from "../../../constants/imagePath";
import navigationStrings from "../../../constants/navigationStrings";

const Congrats = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate(navigationStrings.MAP_SCREEN);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Image source={imagePath.icChampagne} style={styles.cheers} />
      <Text style={styles.textStyle}>
        You have successfully submitted the event
      </Text>
    </View>
  );
};

export default Congrats;
