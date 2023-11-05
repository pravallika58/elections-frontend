import { View, Text, useColorScheme } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { darkTheme, lightTheme } from "../../../constants/colors";
import Header from "../../../components/Header";
import { SafeAreaView } from "react-native";
import navigationStrings from "../../../constants/navigationStrings";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import SettingComponents from "../../../components/SettingComponents";
import WordIcon from "../../../components/WordIcon";

const Settings = ({ navigation }) => {
  const [defaultKey, setDefaultKey] = useState(true);
  const [satelliteKey, setSatelliteKey] = useState(false);
  const [milesKey, setMilesKey] = useState(true);
  const [metersKey, setMetersKey] = useState(false);
  const [lightKey, setLightKey] = useState(true);
  const [darkKey, setDarkKey] = useState(false);
  const [countriesKey, setCountriesKey] = useState(true);
  const [statesKey, setStatesKey] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  const onPressDefault = () => {
    setDefaultKey(true);
    setSatelliteKey(false);
  };

  const onPressSatellite = () => {
    setDefaultKey(false);
    setSatelliteKey(true);
  };

  const onPressMiles = () => {
    setMilesKey(true);
    setMetersKey(false);
  };

  const onPressMeters = () => {
    setMilesKey(false);
    setMetersKey(true);
  };

  const onPressLight = () => {
    setLightKey(true);
    setDarkKey(false);
  };

  const onPressDark = () => {
    setLightKey(false);
    setDarkKey(true);
  };

  const onPressCountries = () => {
    setCountriesKey(true);
    setStatesKey(false);
  };

  const onPressStates = () => {
    setCountriesKey(false);
    setStatesKey(true);
  };

  function renderHeader() {
    return (
      <Header
        label="Settings"
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

  function renderSettingsComponents() {
    return (
      <>
        <SettingComponents
          title="Map"
          label1="Default"
          label2="Satellite"
          label1Key={defaultKey}
          label2Key={satelliteKey}
          onPressLabel1={onPressDefault}
          onPressLabel2={onPressSatellite}
        />
        {/* <SettingComponents
          title="Units"
          label1="Miles"
          label2="Meters"
          label1Key={milesKey}
          label2Key={metersKey}
          onPressLabel1={onPressMiles}
          onPressLabel2={onPressMeters}
        /> */}
        {/* <SettingComponents
          title="Display Mode"
          label1="Light"
          label2="Dark"
          label1Key={lightKey}
          label2Key={darkKey}
          onPressLabel1={onPressLight}
          onPressLabel2={onPressDark}
        /> */}
        {/* <SettingComponents
          title="Boundaries"
          label1="Countries"
          label2="States"
          label1Key={countriesKey}
          label2Key={statesKey}
          onPressLabel1={onPressCountries}
          onPressLabel2={onPressStates}
        /> */}
      </>
    );
  }

  function renderManageItems() {
    return (
      <>
        <WordIcon
          title="When in use"
          label="Location Access"
          onPress={() => navigation.navigate(navigationStrings.LOCATION_ACCESS)}
        />
        <WordIcon
          title="Current Location"
          label="Default Location"
          onPress={() =>
            navigation.navigate(navigationStrings.DEFAULT_LOCATION)
          }
        />
        <WordIcon label="Manage Notifications" />
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
      {renderSettingsComponents()}
      {renderManageItems()}
    </SafeAreaView>
  );
};

export default Settings;
