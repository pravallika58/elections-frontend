import { View } from "react-native";
import React, { useEffect } from "react";
import { Image } from "expo-image";
import imagePath from "../../constants/imagePath";
import navigationStrings from "../../constants/navigationStrings";
import { getData } from "../../utils/helperFunctions";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getData("token");
        console.log(token);
        const timeout = setTimeout(() => {
          if (token) {
            navigation.replace(navigationStrings.MAIN, {
              screen: navigationStrings.MAP_SCREEN,
            });
          } else {
            navigation.replace(navigationStrings.LOGIN);
          }
        }, 2000);

        return () => clearTimeout(timeout);
      } catch (error) {
        console.error("AsyncStorage error:", error.message);
      }
    };

    fetchData();
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
