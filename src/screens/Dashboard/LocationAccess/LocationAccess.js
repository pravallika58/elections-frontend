import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { darkTheme, lightTheme } from "../../../constants/colors";
import styles from "./styles";
import Header from "../../../components/Header";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import IconTextIcon from "../../../components/IconTextIcon";
import dummyData from "../../../constants/dummyData";
import Checkbox from "expo-checkbox";
import WordIcon from "../../../components/WordIcon";
import CustomButton from "../../../components/CustomButton";

const initialCheckedState = new Array(dummyData.favorites2.length).fill(false);

const LocationAccess = ({ navigation }) => {
  const [checkedItems, setCheckedItems] = useState(initialCheckedState);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  function renderHeader() {
    return (
      <Header
        label="Locations"
        showRightArrow={true}
        onPressArrow={() => navigation.goBack()}
        customLabelStyle={{
          fontSize: textScale(24),
        }}
      />
    );
  }

  function renderSearchBar() {
    return (
      <View style={styles.searchBarCont}>
        <GooglePlacesAutocomplete
          styles={{
            textInputContainer: {
              width: "98%",
            },
            textInput: {
              fontSize: textScale(15),
              backgroundColor: theme.bottomSheetColor,
              color: theme.textColor,
            },
          }}
          fetchDetails={true}
          placeholder={"Find Location"}
          query={{
            // key: googleKey,
            language: "en",
          }}
        />
      </View>
    );
  }

  function renderFavoriteList() {
    return (
      <>
        {dummyData.favorites2.map((item, index) => (
          <TouchableOpacity
            // onPress={() => setTitle(item.title)}
            activeOpacity={0.8}
            style={styles.favoriteLocation}
            key={item.id}
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
                {item.title}
              </Text>
              <Text
                style={[
                  styles.subTitleStyle,
                  {
                    paddingTop: verticalScale(5),
                  },
                ]}
              >
                {item.label}
              </Text>
              <Text style={styles.subTitleStyle}>{item.subtitle}</Text>
            </View>
            <Checkbox
              style={styles.checkbox}
              value={checkedItems[index]}
              onValueChange={() => handleCheckboxChange(index)}
              color={theme.buttonBackground}
            />
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
      {renderSearchBar()}

      <ScrollView>
        <IconTextIcon
          label="Bowling Green"
          customContainerStyle={{
            marginTop: verticalScale(20),
          }}
          subLabel="Bowling Green, Ohio"
          subHeading="Wood County"
          moreinfo={true}
          showTick={false}
        />
        <View style={styles.favoriteStyleCont}>
          <Text
            style={[
              styles.favoriteStyle,
              {
                color: theme.textColor,
              },
            ]}
          >
            Favorites
          </Text>
          <CustomButton
            customStyles={{
              width: moderateScale(85),
            }}
            label="Edit"
          />
        </View>
        {renderFavoriteList()}
        <WordIcon
          customSubTitle={{
            paddingHorizontal: scale(29),
          }}
          label="Recent"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationAccess;
