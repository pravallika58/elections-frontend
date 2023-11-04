import { View, Text, TouchableOpacity, Image } from "react-native";
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

const MapRoute = ({ navigation }) => {
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
    <View style={styles.MapStyle}>
      {renderHeader()}
      <MapView
        style={styles.MapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
      ></MapView>
      <View style={styles.mapPinContainer}>
        <Image source={imagePath.icPin} style={styles.pinStyle} />
      </View>
    </View>
  );
};

export default MapRoute;
