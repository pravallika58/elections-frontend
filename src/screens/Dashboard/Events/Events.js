import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./styles";
import colors, {
  darkTheme,
  lightTheme,
  mapCustomStyle,
} from "../../../constants/colors";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import imagePath from "../../../constants/imagePath";
import BottomSheet from "@gorhom/bottom-sheet";
import constants, { GOOGLE_API_KEY } from "../../../constants/constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../../components/CustomButton";
import navigationStrings from "../../../constants/navigationStrings";
import { getData, showError, showSucess } from "../../../utils/helperFunctions";
import { scale, verticalScale } from "../../../constants/responsiveSizes";
import { createEvent, updateEvent } from "../../../redux/actions/event";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Geocoder from "react-native-geocoding";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

const Events = ({ navigation, route }) => {
  const { item, key } = route.params;
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [tapLocation, setTapLocation] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [website, setWebsite] = useState("");
  const [typeArtEvent, setTypeArtEvent] = useState("Select Type ");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [token, setToken] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [images, setImages] = useState([]);
  const [permanent, setPermanent] = useState(false);
  const [region, setRegion] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ["25%", "40%"], []);
  const mapViewRef = useRef();

  useEffect(() => {
    Geocoder.init(GOOGLE_API_KEY);
  }, []);

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

  useEffect(() => {
    if (key === "edit") {
      setEventName(item.eventname);
      setDescription(item.description);
      setLocation(item.location);
      setCity(item.city);
      setProvince(item.state);
      setCountry(item.country);
      setZipCode(item.zipcode);
      setLat(item.latitude);
      setLong(item.longitude);
      setWebsite(item.website);
      setTypeArtEvent(item.type);
      setStartDate(new Date(item.startdate));
      setEndDate(new Date(item.enddate));
      setStartTime(new Date(item.starttime));
      setEndTime(new Date(item.endtime));
      setImages(item.images);
      setPermanent(item.permanent);
    }
  }, []);

  const fetchLocationDetails = async () => {
    try {
      const res = await Geocoder.from(location);
      const { results } = res;

      if (results.length > 0) {
        const { address_components, geometry } = results[0];

        const { lat, lng } = geometry.location;
        setLat(parseFloat(lat));
        setLong(parseFloat(lng));
        mapViewRef.current.animateToRegion({
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        const city = address_components.find((component) =>
          component.types.includes("locality")
        ).long_name;
        setCity(city);

        const province = address_components.find((component) =>
          component.types.includes("administrative_area_level_1")
        ).long_name;
        setProvince(province);

        const country = address_components.find((component) =>
          component.types.includes("country")
        ).long_name;
        setCountry(country);

        const zipCode = address_components.find((component) =>
          component.types.includes("postal_code")
        );
        setZipCode(zipCode ? zipCode.long_name : "");
      }
    } catch (error) {
      console.error("Error fetching location details: ", error);
    }
  };

  useEffect(() => {
    const requestPermission = async () => {
      setTokenLoading(true);
      const token = await getData("token");
      setToken(token);
      setTokenLoading(false);
    };
    requestPermission();
  }, []);

  const normalState = () => {
    setEventName("");
    setDescription("");
    setLocation("");
    setCity("");
    setProvince("");
    setCountry("");
    setZipCode("");
    setLat(null);
    setLong(null);
    setWebsite("");
    setTypeArtEvent("Type of the Event ");
    setStartDate(new Date());
    setEndDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setFeatureImage("");
    setImages([]);
    setPermanent(false);
  };

  const onPressUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("eventname", eventName);
      formData.append("type", typeArtEvent);
      formData.append("startdate", startDate.toISOString());
      formData.append("enddate", endDate.toISOString());
      formData.append("starttime", startTime.toISOString());
      formData.append("endtime", endTime.toISOString());
      formData.append("location", location);
      formData.append("city", city);
      formData.append("state", province);
      formData.append("country", country);
      formData.append("zipcode", zipCode);
      formData.append("latitude", lat);
      formData.append("longitude", long);
      formData.append("website", website);
      formData.append("permanent", permanent);
      formData.append("description", description);
      images.forEach((image, index) => {
        formData.append("images", {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      });

      const res = await updateEvent(formData, item._id);
      normalState();
      showSucess("Event updated successfully");
      setLoading(false);
      navigation.navigate(navigationStrings.MY_EVENTS);
      setLoading(false);
    } catch (error) {
      showError(error?.message);
      normalState();
      setLoading(false);
    }
  };

  const onPressSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("eventname", eventName);
      formData.append("type", typeArtEvent);
      formData.append("startdate", permanent ? null : startDate.toISOString());
      formData.append("enddate", permanent ? null : endDate.toISOString());
      formData.append("starttime", startTime.toISOString());
      formData.append("endtime", endTime.toISOString());
      formData.append("location", location);
      formData.append("city", city);
      formData.append("state", province);
      formData.append("country", country);
      formData.append("zipcode", zipCode);
      formData.append("latitude", lat);
      formData.append("longitude", long);
      formData.append("website", website);
      formData.append("permanent", permanent);
      formData.append("description", description);
      images.forEach((image, index) => {
        formData.append("images", {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      });

      const res = await createEvent(formData);
      normalState();
      showSucess("Event created successfully");
      setLoading(false);
      navigation.replace(navigationStrings.MAIN, {
        screen: navigationStrings.CONGRATS,
      });
      setLoading(false);
    } catch (error) {
      showError(error?.message);
      normalState();
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const maxImages = 4;

    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (results.canceled) {
      return;
    }
    let existingSelectedImages = images.slice();
    let selectedImages = existingSelectedImages.concat(results.assets);
    if (selectedImages.length > maxImages) {
      selectedImages = selectedImages.slice(0, maxImages);
    }

    setImages(selectedImages);
  };

  const pickFeatureImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (results.canceled) {
      return;
    }
    setFeatureImage(results.assets[0]);
  };

  const removeImage = (index) => {
    let updatedImages = images.slice();
    updatedImages.splice(index, 1);
    setImages(updatedImages);
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

  const onChangeLocation = (text) => {
    if (text.length === 0) {
      setCity("");
      setProvince("");
      setCountry("");
      setZipCode("");
      setLat(null);
      setLong(null);
    }
    setLocation(text);
  };

  const onEndEditingLocation = () => {
    fetchLocationDetails();
  };

  const handleMarkerDragEnd = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLat(latitude);
    setLong(longitude);

    try {
      const response = await Geocoder.from(latitude, longitude);
      const { results } = response;

      if (results.length > 0) {
        const address = results[0];
        const city =
          address.address_components.find((component) =>
            component.types.includes("locality")
          )?.long_name || "N/A";
        setCity(city);
        const country =
          address.address_components.find((component) =>
            component.types.includes("country")
          )?.long_name || "N/A";
        setCountry(country);
        const province =
          address.address_components.find((component) =>
            component.types.includes("administrative_area_level_1")
          )?.long_name || "N/A";
        setProvince(province);
        const zipCode =
          address.address_components.find((component) =>
            component.types.includes("postal_code")
          )?.long_name || "N/A";
        setZipCode(zipCode);
        const locationName = address.formatted_address;
        setLocation(locationName);
      }
    } catch (error) {
      console.error("Error in reverse geocoding: ", error);
    }
  };

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLat(latitude);
    setLong(longitude);

    try {
      const response = await Geocoder.from(latitude, longitude);
      const { results } = response;

      if (results.length > 0) {
        const address = results[0];
        const city =
          address.address_components.find((component) =>
            component.types.includes("locality")
          )?.long_name || "N/A";
        setCity(city);
        const country =
          address.address_components.find((component) =>
            component.types.includes("country")
          )?.long_name || "N/A";
        setCountry(country);
        const province =
          address.address_components.find((component) =>
            component.types.includes("administrative_area_level_1")
          )?.long_name || "N/A";
        setProvince(province);
        const zipCode =
          address.address_components.find((component) =>
            component.types.includes("postal_code")
          )?.long_name || "N/A";
        setZipCode(zipCode);
        const locationName = address.formatted_address;
        setLocation(locationName);
      }
    } catch (error) {
      console.error("Error in reverse geocoding: ", error);
    }
  };

  function isEnable() {
    if (
      eventName &&
      location &&
      city &&
      province &&
      country &&
      zipCode &&
      typeArtEvent &&
      images.length > 0
    ) {
      return false;
    }
    return true;
  }

  function dateOfStartAndEnd() {
    return (
      <View style={styles.selectDateContainer}>
        <View>
          <Text
            style={[
              styles.labelStyle,
              {
                color: theme.textColor,
              },
            ]}
          >
            Start Date
          </Text>
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
          <Text
            style={[
              styles.labelStyle,
              {
                color: theme.textColor,
              },
            ]}
          >
            End Date
          </Text>
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
    );
  }

  function permanentEvent() {
    return (
      <View style={styles.permanentCont}>
        <Text
          style={[
            styles.permanentTextStyle,
            {
              color: theme.textColor,
            },
          ]}
        >
          Is it a permanent event?
        </Text>
        <Checkbox
          value={permanent}
          onValueChange={setPermanent}
          style={styles.checkboxContainer}
        />
      </View>
    );
  }

  function renderWhenEvent() {
    return (
      <View
        style={[
          styles.mainContainer,
          {
            backgroundColor: theme.inputContainer,
          },
        ]}
      >
        <Text
          style={[
            styles.whenEvent,
            {
              color: theme.textColor,
            },
          ]}
        >
          When is your event?
        </Text>

        {permanentEvent()}
        {permanent ? null : dateOfStartAndEnd()}

        <View style={styles.selectDateContainer}>
          <View>
            <Text
              style={[
                styles.labelStyle,
                {
                  color: theme.textColor,
                },
              ]}
            >
              Start Time
            </Text>
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
            <Text
              style={[
                styles.labelStyle,
                {
                  color: theme.textColor,
                },
              ]}
            >
              End Time
            </Text>
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
          onSubmitEditing={onEndEditingLocation}
          isRequired={true}
          value={location}
          onChangeText={onChangeLocation}
          customContainerStyle={styles.customContainerStyle1}
          label="Event Address"
          placeholder="Location"
        />
        <View style={styles.addressContainer}>
          <Input
            value={city}
            onChangeText={(text) => setCity(text)}
            customContainerStyle={styles.marginStyles}
            styleInput={styles.styleInput}
            placeholder="City"
          />
          <Input
            value={province}
            onChangeText={(text) => setProvince(text)}
            customContainerStyle={styles.marginStyles}
            styleInput={styles.styleInput}
            placeholder="State"
          />
        </View>
        <View style={styles.container1}>
          <Input
            value={country}
            onChangeText={(text) => setCountry(text)}
            customContainerStyle={styles.marginStyles}
            styleInput={styles.styleInput}
            placeholder="Country"
          />
          <Input
            value={zipCode}
            onChangeText={(text) => setZipCode(text)}
            customContainerStyle={styles.marginStyles}
            styleInput={styles.styleInput}
            placeholder="ZIP code"
          />
        </View>

        <Input
          value={lat !== null ? lat.toString() : ""}
          onChangeText={(text) => setLat(text)}
          customContainerStyle={styles.customContainerStyle1}
          label={"Latitude"}
          placeholder="38.89767"
        />
        <Input
          value={long !== null ? long.toString() : ""}
          onChangeText={(text) => setLong(text)}
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
        <Text
          style={[
            styles.mapText,
            {
              color: theme.textColor,
            },
          ]}
        >
          Map
        </Text>
        <MapView
          onLongPress={handleMapPress}
          ref={mapViewRef}
          region={region}
          showsUserLocation={true}
          customMapStyle={colorScheme === "light" ? [] : mapCustomStyle}
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
        >
          {lat && long && (
            <Marker
              coordinate={{ latitude: lat, longitude: long }}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </MapView>
      </>
    );
  }

  function renderFeatureImage() {
    return (
      <>
        <Text
          style={[
            styles.featureText,
            {
              color: theme.textColor,
            },
          ]}
        >
          Feature Image for Event
        </Text>
        <View
          style={[
            styles.chooseFileContainer,
            {
              backgroundColor: theme.inputContainer,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={pickFeatureImage}
            style={[
              styles.part1,
              {
                backgroundColor: theme.inputContainer,
              },
            ]}
          >
            <Text
              style={[
                styles.textStyle,
                {
                  color: theme.textColor,
                },
              ]}
            >
              Choose File
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.part2,
              {
                backgroundColor: theme.inputContainer,
              },
            ]}
          >
            {featureImage ? (
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                {featureImage.fileName}
              </Text>
            ) : (
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                No file selected
              </Text>
            )}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.infoText,
              {
                color: theme.textColor,
              },
            ]}
          >
            Accepted File types : jpg, jpeg, png, gifMax file size : 3MB
          </Text>
        </View>
      </>
    );
  }

  function renderUpto4Images() {
    return (
      <>
        <Text
          style={[
            styles.featureText,
            {
              color: theme.textColor,
            },
          ]}
        >
          Upto 4 Images for Event first image will be feature image
          <Text
            style={{
              color: "red",
            }}
          >
            *
          </Text>
        </Text>

        <View style={styles.imageContainer}>
          {images.length < 4 && (
            <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
              <Image
                source={imagePath.icCamera}
                style={[
                  styles.cameraIconStyle,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
              />
            </TouchableOpacity>
          )}

          {images.map((image, index) => (
            <View key={index}>
              <Image
                source={{ uri: key === "edit" ? image.url : image.uri }}
                style={styles.imageStyle}
              />
              <TouchableOpacity
                style={styles.crossIconStyle}
                onPress={() => removeImage(index)}
              >
                {index === 0 && (
                  <AntDesign
                    name="star"
                    size={12}
                    color="yellow"
                    style={{
                      right: scale(18),
                      top: verticalScale(5),
                    }}
                  />
                )}
                <Entypo name="circle-with-cross" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.infoText,
              {
                color: theme.textColor,
              },
            ]}
          >
            Accepted File types : jpg, jpeg, png, gifMax file size : 3MB
          </Text>
        </View>
      </>
    );
  }

  function renderTypeOfArtEvent() {
    return (
      <View>
        <View style={styles.mainHeadCont}>
          <Text
            style={[
              styles.labelStyle,
              {
                color: theme.textColor,
              },
            ]}
          >
            Type of the Event
          </Text>

          <Text style={styles.steric}>*</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowBottomSheet(true)}
          style={[
            styles.chooseType,
            {
              backgroundColor: theme.inputContainer,
            },
          ]}
        >
          <Text
            style={[
              styles.typeArtEventText,
              {
                color: theme.textColor,
              },
            ]}
          >
            {typeArtEvent}
          </Text>
          <Image
            source={imagePath.icDownArrow}
            style={[
              styles.iconStyle,
              {
                tintColor: theme.textColor,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderCreateEventForm() {
    return (
      <View>
        <Input
          isRequired={true}
          value={eventName}
          onChangeText={(text) => setEventName(text)}
          customContainerStyle={styles.customContainerStyle1}
          label="Event Name"
          placeholder="Enter event name"
        />
        {renderTypeOfArtEvent()}
        {renderWhenEvent()}
        {renderEventAddress()}
        {renderMap()}
        <Input
          value={website}
          onChangeText={(text) => setWebsite(text)}
          customContainerStyle={styles.customContainerStyle1}
          label="Event Website"
          placeholder="https://"
        />
        <Input
          value={description}
          onChangeText={(text) => setDescription(text)}
          customContainerStyle={styles.customContainerStyle1}
          label="Description"
          placeholder="Type here....."
          multiline={true}
          styleInput={styles.styleInput2}
        />
        {/* {renderFeatureImage()} */}
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
          backgroundColor: theme.bottomSheetColor,
        }}
      >
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: theme.bottomSheetColor,
            },
          ]}
        >
          <Text
            style={[
              styles.selectText,
              {
                color: theme.textColor,
              },
            ]}
          >
            Select Type Of Art Event
          </Text>
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
                <Text
                  style={[
                    styles.typeArtEventText,
                    {
                      color: theme.textColor,
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheet>
    );
  }

  if (tokenLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="small" color={theme.textColor} />
      </View>
    );
  }

  return (
    <>
      {!token ? (
        <View
          style={[
            styles.notTokenContainer,
            {
              backgroundColor: theme.background,
            },
          ]}
        >
          <Text
            style={[
              styles.textStyle2,
              {
                color: theme.textColor,
              },
            ]}
          >
            Ooops! you are not registered user. To create Event you need to
            login first
          </Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              customStyles={styles.buttonBackground}
              label="Skip"
              onPress={() => navigation.navigate(navigationStrings.MAP_SCREEN)}
            />
            <CustomButton
              customStyles={styles.buttonBackground}
              label="Login"
              onPress={() =>
                navigation.replace(navigationStrings.AUTH, {
                  screen: navigationStrings.LOGIN,
                })
              }
            />
          </View>
        </View>
      ) : (
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
            disabled={isEnable()}
            isLoading={loading}
            onPress={key === "edit" ? onPressUpdate : onPressSubmit}
            customStyles={{
              marginBottom: verticalScale(20),
              backgroundColor: isEnable() ? "grey" : theme.buttonBackground,
            }}
            label={key === "edit" ? "Update" : "Submit"}
          />
          {showBottomSheet && renderBottomSheet()}
        </SafeAreaView>
      )}
    </>
  );
};

export default Events;
