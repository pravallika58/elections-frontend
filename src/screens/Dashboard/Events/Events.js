import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "./styles";
import colors, { darkTheme, lightTheme } from "../../../constants/colors";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import imagePath from "../../../constants/imagePath";
import BottomSheet from "@gorhom/bottom-sheet";
import constants from "../../../constants/constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../../components/CustomButton";
import navigationStrings from "../../../constants/navigationStrings";

const Events = ({ navigation }) => {
  const [typeArtEvent, setTypeArtEvent] = useState("Type of the Event ");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [featureImage, setFeatureImage] = useState("");
  const [images, setImages] = useState([]);
  const [permanent, setPermanent] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ["25%", "40%"], []);

  const pickImage = async () => {
    const maxImages = 4;
    let selectedImages = [];

    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (results.canceled) {
      return;
    }

    for (let i = 0; i < Math.min(maxImages, results.assets.length); i++) {
      selectedImages.push(results.assets[i].uri);
    }
    setImages(selectedImages);
  };

  const pickFeatureImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(results);
    if (results.canceled) {
      return;
    }
    setFeatureImage(results.assets[0]);
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
  };

  const onChangeStartTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartTime(currentDate);
  };

  const onChangeEndTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndTime(currentDate);
  };

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setShowBottomSheet(false);
    }
  }, []);

  function renderWhenEvent() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.whenEvent}>When is your event?</Text>
        <View style={styles.selectDateContainer}>
          <View>
            <Text style={styles.labelStyle}>Start Date</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              mode={"date"}
              is24Hour={true}
              onChange={onChangeStartDate}
              display="default"
            />
          </View>
          <View>
            <Text style={styles.labelStyle}>End Date</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={endDate}
              mode={"date"}
              is24Hour={true}
              onChange={onChangeEndDate}
              display="default"
            />
          </View>
        </View>
        <Text style={styles.orStyle}>OR</Text>
        <View style={styles.permanentCont}>
          <Text style={styles.permanentTextStyle}>Permanent</Text>
          <Checkbox value={permanent} onValueChange={setPermanent} />
        </View>
        <View style={styles.selectDateContainer}>
          <View>
            <Text style={styles.labelStyle}>Start Time</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={startTime}
              mode={"time"}
              is24Hour={true}
              onChange={onChangeStartTime}
              display="default"
            />
          </View>
          <View>
            <Text style={styles.labelStyle}>End Time</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={endTime}
              mode={"time"}
              is24Hour={true}
              onChange={onChangeEndTime}
              display="default"
            />
          </View>
        </View>
      </View>
    );
  }

  function renderEventAddress() {
    return (
      <View>
        <Input
          customContainerStyle={styles.customContainerStyle1}
          label="Event Address"
          placeholder="Location"
        />
        <View style={styles.addressContainer}>
          <Input
            customContainerStyle={styles.marginStyles}
            styleInput={styles.styleInput}
            placeholder="City"
          />
          <Input
            customContainerStyle={styles.marginStyles}
            styleInput={styles.styleInput}
            placeholder="State"
          />
        </View>
        <View style={styles.container1}>
          <Input
            customContainerStyle={styles.marginStyles}
            styleInput={styles.styleInput}
            placeholder="Country"
          />
          <Input
            customContainerStyle={styles.marginStyles}
            styleInput={styles.styleInput}
            placeholder="ZIP code"
          />
        </View>

        <Text style={styles.orStyle}>OR</Text>
        <Input
          customContainerStyle={styles.customContainerStyle1}
          label={"Latitude"}
          placeholder="38.89767"
        />
        <Input
          customContainerStyle={styles.customContainerStyle1}
          label="Longitude"
          placeholder="-77.03652"
        />
      </View>
    );
  }

  function renderHeader() {
    return (
      <Header
        label="Events"
        showRightArrow={true}
        onPressArrow={() => navigation.goBack()}
        customLabelStyle={styles.customLabelStyle}
        customHeaderContainer={styles.customHeaderContainer}
      />
    );
  }

  function renderMap() {
    return (
      <>
        <Text style={styles.mapText}>Map</Text>
        <MapView
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
        />
      </>
    );
  }

  function renderFeatureImage() {
    return (
      <>
        <Text style={styles.featureText}>Feature Image for Event</Text>
        <View style={styles.chooseFileContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={pickFeatureImage}
            style={styles.part1}
          >
            <Text style={styles.textStyle}>Choose File</Text>
          </TouchableOpacity>
          <View style={styles.part2}>
            {featureImage ? (
              <Text style={styles.textStyle}>{featureImage.fileName}</Text>
            ) : (
              <Text style={styles.textStyle}>No file selected</Text>
            )}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Accepted File types : jpg, jpeg, png, gifMax file size : 3MB
          </Text>
        </View>
      </>
    );
  }

  function renderUpto4Images() {
    return (
      <>
        <Text style={styles.featureText}>Add up to four more Images</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
            <Image source={imagePath.icCamera} style={styles.cameraIconStyle} />
          </TouchableOpacity>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.imageStyle}
            />
          ))}
        </View>
      </>
    );
  }

  function renderCreateEventForm() {
    return (
      <View>
        <Input
          customContainerStyle={styles.customContainerStyle1}
          label="Event Name"
          placeholder="Enter event name"
        />
        <TouchableOpacity
          onPress={() => setShowBottomSheet(true)}
          style={styles.chooseType}
        >
          <Text style={styles.typeArtEventText}>{typeArtEvent}</Text>
          <Image source={imagePath.icDownArrow} style={styles.iconStyle} />
        </TouchableOpacity>
        {renderWhenEvent()}
        {renderEventAddress()}
        {renderMap()}
        <Input
          customContainerStyle={styles.customContainerStyle1}
          label="Event Website"
          placeholder="https://"
        />
        <Input
          customContainerStyle={styles.customContainerStyle1}
          label="Description"
          placeholder="Type here....."
          multiline={true}
          styleInput={styles.styleInput2}
        />
        {renderFeatureImage()}
        {renderUpto4Images()}
      </View>
    );
  }

  function renderBottomSheet() {
    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: colors.white,
          borderWidth: 0.5,
          borderColor: "grey",
        }}
      >
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: colors.white,
            },
          ]}
        >
          <Text style={styles.selectText}>Select Type Of Art Event</Text>
          {constants.typeOfArtEvent.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setTypeArtEvent(item.name);
                  setShowBottomSheet(false);
                }}
                key={item.id}
                style={styles.typeArtEventContainer}
              >
                <Text style={styles.typeArtEventText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheet>
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
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {renderCreateEventForm()}
      </KeyboardAwareScrollView>
      <CustomButton
        onPress={() => navigation.navigate(navigationStrings.CONGRATS)}
        customStyles={styles.customStyles}
        label="Submit"
      />
      {showBottomSheet && renderBottomSheet()}
    </SafeAreaView>
  );
};

export default Events;
