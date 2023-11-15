import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { darkTheme, lightTheme } from "../../../constants/colors";
import Header from "../../../components/Header";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import IconTextIcon from "../../../components/IconTextIcon";
import WordIcon from "../../../components/WordIcon";
import imagePath from "../../../constants/imagePath";
import { getData, storeData } from "../../../utils/helperFunctions";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { GOOGLE_API_KEY } from "../../../constants/constants";

const DefaultLocation = ({ navigation }) => {
  const [title, setTitle] = React.useState("Current Location");
  const [locationsData, setLocationsData] = useState([]);
  const [fullAddress, setFullAddress] = useState("");
  const [curLoc, setCurLoc] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    getLocationName();
  }, []);

  useEffect(() => {
    const data = async () => {
      const res = await getData("selectedData");
      if (res) {
        const data = JSON.parse(res);
        setLocationsData(data);
      } else {
        return null;
      }
    };
    data();
  }, []);

  useEffect(() => {
    const data2 = async () => {
      const res = await getData("selectedDefaultLocation");
      if (res) {
        const data = JSON.parse(res);
        setTitle(data.label);
      } else {
        setTitle("Current Location");
      }
    };
    data2();
  }, []);

  const getLocationName = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const location = await getCurrentPositionAsync({});
      setLat(location.coords.latitude);
      setLng(location.coords.longitude);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      const firstResult = data.results[0];
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
      setFullAddress(cityState);
    } catch (error) {
      console.error("Error getting location and name:", error);
    }
  };

  const handleDefaultLocation = async (data) => {
    await storeData("selectedDefaultLocation", JSON.stringify(data));
  };

  const storeDataOfDefaultLocation = async (item) => {
    try {
      const dataToStore = {
        lat: item.lat,
        long: item.long,
        label: item.label,
        subLabel: item.subLabel,
        heading: item.heading,
        cur: false,
      };
      setTitle(item.label);
      handleDefaultLocation(dataToStore);
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  const onPressCurLoc = () => {
    const data = {
      lat: lat,
      long: lng,
      label: "Current Location",
      subLabel: fullAddress,
      cur: true,
    };

    setTitle("Current Location"), setCurLoc(true), handleDefaultLocation(data);
  };

  function renderHeader() {
    return (
      <Header
        label="Default Location"
        showRightArrow={true}
        onPressArrow={() => navigation.goBack()}
        customLabelStyle={{
          fontSize: textScale(24),
        }}
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

  function renderFavoriteList() {
    return (
      <>
        {locationsData.map((item, index) => (
          <TouchableOpacity
            onPress={() => storeDataOfDefaultLocation(item)}
            activeOpacity={0.8}
            style={styles.favoriteLocation}
            key={index}
          >
            <View>
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                {item.label}
              </Text>
              <Text style={styles.subTitleStyle}>{item.subLabel}</Text>
            </View>
            {title === item.label && (
              <Image
                source={imagePath.icTick}
                style={[
                  styles.tickStyle,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
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
      <View style={styles.subHeadingContainer}>
        <Text
          style={[
            styles.subHeading,
            {
              color: theme.textColor,
            },
          ]}
        >
          Select a location to display, when app is opened
        </Text>
      </View>
      <IconTextIcon label={title} showTick={true} />
      {locationsData.length === 0 ? null : (
        <>
          <TouchableOpacity
            style={styles.favoriteLocation}
            onPress={onPressCurLoc}
          >
            <Text
              style={[
                styles.labelStyle,
                {
                  color: theme.textColor,
                },
              ]}
            >
              Current Location
            </Text>
            {title === "Current Location" && (
              <Image
                source={imagePath.icTick}
                style={[
                  styles.tickStyle,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        </>
      )}
      {locationsData.length === 0 ? null : (
        <>
          <View style={styles.favoriteStyleCont}>
            <Text
              style={[
                styles.favoriteStyle,
                {
                  color: theme.textColor,
                },
              ]}
            >
              FAVORITES
            </Text>
          </View>
          {renderFavoriteList()}
        </>
      )}
      {/* <WordIcon
        customSubTitle={{
          paddingHorizontal: scale(29),
        }}
        label="Exit Locations"
      /> */}
    </SafeAreaView>
  );
};

export default DefaultLocation;
