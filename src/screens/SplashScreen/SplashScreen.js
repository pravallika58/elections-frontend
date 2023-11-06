import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Image } from "expo-image";
import imagePath from "../../constants/imagePath";
import navigationStrings from "../../constants/navigationStrings";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace(navigationStrings.LOGIN);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={imagePath.icSplash}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
};

export default SplashScreen;
