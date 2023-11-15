import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { createRef, useEffect, useState } from "react";
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
import { GOOGLE_API_KEY } from "../../../constants/constants";

import {
  makeLocationDislike,
  makeLocationFavorite,
  getAllFavoriteLocations,
} from "../../../redux/actions/location";
import { showSucess, storeData } from "../../../utils/helperFunctions";

const initialCheckedState = new Array(dummyData.favorites2.length).fill(false);

const LocationAccess = ({ navigation }) => {
  const [checkedItems, setCheckedItems] = useState(initialCheckedState);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [longitude, setLongitude] = useState(null);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  const testRef = createRef();

  useEffect(() => {
    getAllLocations();
  }, []);

  const getAllLocations = async () => {
    try {
      const res = await getAllFavoriteLocations();
      const locations = res.data;
      setFavoriteLocations(locations);
    } catch (error) {
      console.log("error", error);
    }
  };

  const saveLocationData = async () => {
    testRef.current.clear();
    setIsLiked(true);
    try {
      const data = {
        title,
        subTitle,
        subHeading,
        latitude,
        longitude,
      };

      const res = await makeLocationFavorite(data);
      showSucess(res.message);
      setTitle("");
      setSubTitle("");
      setSubHeading("");
      setLatitude(null);
      setLongitude(null);
      setIsLiked(false);
      getAllLocations();
    } catch (error) {
      console.log("error", error);
    }
  };

  const saveSelectedLocationData = async () => {
    try {
      const selectedData = await Promise.all(
        selectedItems.map((item) => ({
          lat: item.latitude,
          long: item.longitude,
          label: item.title,
          subLabel: item.subTitle,
          heading: item.subHeading,
        }))
      );

      await storeData("selectedData", JSON.stringify(selectedData));
      showSucess("Saved");
      setShowCheckBox(false);
      setSelectedItems([]);
      setCheckedItems(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    const selectedItem = favoriteLocations[index];
    if (newCheckedItems[index]) {
      const newSelectedItems = [...selectedItems, selectedItem];
      setSelectedItems(newSelectedItems);
    } else {
      const filteredSelectedItems = selectedItems.filter(
        (item) => item !== selectedItem
      );

      setSelectedItems(filteredSelectedItems);
    }
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
          enablePoweredByContainer={false}
          ref={testRef}
          onPress={(data, details = null) => {
            const latitude = details.geometry.location.lat;
            const longitude = details.geometry.location.lng;
            setLatitude(latitude);
            setLongitude(longitude);
            setTitle(details.address_components[0].long_name);
            setSubTitle(details.formatted_address);
            setSubHeading(details.address_components[2].long_name);
          }}
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
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      </View>
    );
  }

  function renderFavoriteList() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {favoriteLocations.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.favoriteLocation}
            key={item._id}
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
                {item.subTitle}
              </Text>
              <Text style={styles.subTitleStyle}>{item.subHeading}</Text>
            </View>
            {showCheckBox && (
              <Checkbox
                style={styles.checkbox}
                value={checkedItems[index]}
                onValueChange={() => handleCheckboxChange(index)}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
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
        {title !== "" && (
          <IconTextIcon
            isLiked={isLiked}
            showHeart={true}
            onPressHeart={saveLocationData}
            label={title}
            customContainerStyle={{
              marginTop: verticalScale(20),
            }}
            subLabel={subTitle}
            subHeading={subHeading}
            moreinfo={true}
            showTick={false}
          />
        )}
        {favoriteLocations.length === 0 ? null : (
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
              onPress={
                showCheckBox
                  ? saveSelectedLocationData
                  : () => setShowCheckBox(!showCheckBox)
              }
              customStyles={{
                width: moderateScale(85),
              }}
              label={showCheckBox ? "Save" : "Edit"}
            />
          </View>
        )}
        {renderFavoriteList()}

        {/* <WordIcon
          customSubTitle={{
            paddingHorizontal: scale(29),
          }}
          label="Recent"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationAccess;
