import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import React from "react";
import styles from "./styles";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
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

const MapRoute = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
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
        style={styles.MapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={colorScheme === "light" ? [] : mapCustomStyle}
        provider={PROVIDER_GOOGLE}
      ></MapView>
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
