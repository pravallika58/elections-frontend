import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Header from "../../../components/Header";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import imagePath from "../../../constants/imagePath";
import {
  darkTheme,
  lightTheme,
  mapCustomStyle,
} from "../../../constants/colors";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../../../constants/constants";
import { showError } from "../../../utils/helperFunctions";

const MapRoute = ({ navigation, route }) => {
  const [region, setRegion] = useState(null);
  const { latitude, longitude } = route.params;
  const [routeDuration, setRouteDuration] = useState(null);
  console.log("latitude", latitude);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  const mapRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const location = await getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
    })();
  }, []);
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
        locationText="Bowling Green, OH"
        customHeaderContainer={styles.customHeaderContainer}
      />
    );
  }
  return (
    <View
      style={[
        styles.MapStyle,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {renderHeader()}
      <MapView
        ref={mapRef}
        style={styles.MapStyle}
        initialRegion={region}
        showsUserLocation={true}
        customMapStyle={colorScheme === "light" ? [] : mapCustomStyle}
        provider={PROVIDER_GOOGLE}
      >
        {region && (
          <MapViewDirections
            origin={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            destination={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            }}
            apikey={GOOGLE_API_KEY}
            strokeWidth={10}
            strokeColor="#24b0ff"
            optimizeWaypoints={true}
            onReady={(result) => {
              setRouteDuration(result.duration);
              if (mapRef.current) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true,
                });
              }
            }}
            onError={(errorMessage) => {
              showError(errorMessage);
            }}
          />
        )}
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          title={"Destination"}
          description={`Duration: ${routeDuration} min`}
          style={{ width: 40, height: 40 }}
        />
      </MapView>

      <View
        style={[
          styles.mapPinContainer,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <Image source={imagePath.icPin} style={styles.pinStyle} />
      </View>
    </View>
  );
};

export default MapRoute;
