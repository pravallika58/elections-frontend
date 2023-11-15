import {
  View,
  Text,
  SafeAreaView,
  Image,
  useColorScheme,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import styles from "./styles";
import Header from "../../../components/Header";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";

import { darkTheme, lightTheme } from "../../../constants/colors";
import dummyData from "../../../constants/dummyData";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { getData } from "../../../utils/helperFunctions";
import { useFocusEffect } from "@react-navigation/native";
import { GOOGLE_API_KEY } from "../../../constants/constants";

const TermsPolicy = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [title, setTitle] = useState("");
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  const fetchData = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }
      const location = await getCurrentPositionAsync({});
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_API_KEY}`
      );
      const result = await response.json();
      const firstResult = result.results[0];
      const addressComponents = firstResult.address_components;
      const cityComponent = addressComponents.find((component) =>
        component.types.includes("locality")
      );
      const stateComponent = addressComponents.find((component) =>
        component.types.includes("administrative_area_level_1")
      );

      const city = cityComponent ? cityComponent.long_name : "";
      const state = stateComponent ? stateComponent.short_name : "";
      const cityState = `${city}, ${state}`;
      const res = await getData("selectedDefaultLocation");
      const data = JSON.parse(res);

      if (data) {
        data.cur ? setTitle(data.subLabel) : setTitle(data.label);
      } else {
        setTitle(cityState);
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  };

  function renderHeader() {
    return (
      <Header
        label="Elections"
        showRightArrow={true}
        onPressArrow={() => navigation.goBack()}
        customLabelStyle={{
          fontSize: textScale(24),
        }}
        location={true}
        locationText={title}
        customHeaderContainer={{
          borderBottomWidth: 0.5,
          paddingBottom: verticalScale(20),
          marginHorizontal: 0,
          paddingHorizontal: scale(16),
          borderColor: "grey",
        }}
      />
    );
  }

  function renderTermsPolicy() {
    return (
      <>
        {dummyData.PrivacyPolicy.map((item, index) => {
          return (
            <View style={styles.description}>
              <Text
                style={[
                  styles.contentText,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                {index + 1}: {item.description}
              </Text>
            </View>
          );
        })}
      </>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {renderHeader()}

      <View style={styles.bigTitleCont}>
        <Text
          style={[
            styles.bigTitle,
            {
              color: theme.textColor,
            },
          ]}
        >
          Terms of use & Privacy Policy
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
        {renderTermsPolicy()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsPolicy;
