import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  SafeAreaView,
  useColorScheme,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import imagePath from "../../../constants/imagePath";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import navigationStrings from "../../../constants/navigationStrings";
import { Image } from "expo-image";
import {
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import { darkTheme, lightTheme } from "../../../constants/colors";
import Header from "../../../components/Header";
import { showError, showSucess } from "../../../utils/helperFunctions";
import {
  deleteEvent,
  getSingleEvent,
  makeEventDislike,
  makeEventLike,
  saveCandidateName,
} from "../../../redux/actions/event";
import { useFocusEffect } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const EventDetails = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  const [modalWithOptions, setModalWithOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState([]);
  const { eventId, key, title } = route.params;

  const scrollX = new Animated.Value(0);
  const { width } = Dimensions.get("window");
  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    singleEvent();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      singleEvent();
    }, [])
  );

  const singleEvent = async () => {
    setLoading(true);
    try {
      const res = await getSingleEvent(eventId);
      setEvent(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onPressDelete = async () => {
    setModalWithOptions(false);
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },

        {
          text: "OK",
          onPress: () => deleteEventApi(),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteEventApi = async () => {
    try {
      const res = await deleteEvent(eventId);
      showSucess("Event deleted successfully");
      navigation.navigate(navigationStrings.MY_EVENTS);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressLike = async () => {
    try {
      if (event.isLiked) {
        const res = await makeEventDislike(eventId);
        singleEvent();
        showSucess(res.message);
      } else {
        const res = await makeEventLike(eventId);
        singleEvent();
        showSucess(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPressLocation = () => {
    setModalWithOptions(false);
    navigation.navigate(navigationStrings.MAP_ROUTE, {
      latitude: event.latitude,
      longitude: event.longitude,
    });
  };

  const onShare = async () => {
    const deepLink = `elections://${navigationStrings.EVENT_DETAILS}/${eventId}`;

    try {
      const fileUri = FileSystem.cacheDirectory + "event.txt";
      await FileSystem.writeAsStringAsync(fileUri, deepLink);

      const shareOptions = {
        mimeType: "text/plain",
        dialogTitle: "Share this event",
        UTI: "public.plain-text",
        encoding: "UTF-8",
      };

      await Sharing.shareAsync(fileUri, shareOptions);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  function formateTime(time) {
    const date = new Date(time);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const amPM = hours >= 12 ? "PM" : "AM";

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${amPM}`;
  }

  function formateDate(date) {
    const date1 = new Date(date);
    const year = date1.getFullYear();
    const month = date1.getMonth() + 1;
    const dt = date1.getDate();

    return `${dt}:${month}:${year}`;
  }

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

  function renderImages() {
    if (!event || !event.images) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ width, height: "100%", backgroundColor: theme.background }}
        >
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {event.images.map((source, i) => {
              return (
                <Image
                  key={i}
                  style={{ width, height: width }}
                  source={{ uri: source.url }}
                  transition={1000}
                  placeholder={imagePath.icDefault}
                  placeholderContentFit="cover"
                />
              );
            })}
          </ScrollView>
          <View style={styles.pagination}>
            {event.images.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp",
              });
              return (
                <Animated.View
                  key={i}
                  style={{
                    opacity,
                    height: 10,
                    width: 10,
                    backgroundColor: theme.buttonBackground,
                    margin: 8,
                    borderRadius: 5,
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  }

  function renderDetails() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: theme.background,
        }}
      >
        <View style={styles.nameOfSinger}>
          <View
            style={{
              width: "80%",
            }}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.singerNameText,
                {
                  color: theme.textColor,
                },
              ]}
            >
              {event.eventname}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.singerNameText,
                {
                  color: theme.textColor,
                  fontSize: textScale(12),
                  paddingTop: verticalScale(5),
                },
              ]}
            >
              {event.eventcreator}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setModalWithOptions(true)}
            activeOpacity={0.8}
            style={[
              styles.plusCont,
              {
                backgroundColor: theme.background,
              },
            ]}
          >
            <Image
              source={imagePath.icPlus}
              style={[
                styles.plus,
                {
                  tintColor: theme.textColor,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.addressCont}>
          <Text
            style={[
              styles.addressText,
              {
                color: theme.textColor,
                padding: 3,
              },
            ]}
          >
            Address: {event.location} {event.city} {event.state}
          </Text>
          {event.permanent === true ? (
            <Text
              style={[
                styles.addressText,
                {
                  color: theme.textColor,
                  padding: 3,
                },
              ]}
            >
              Permanent: Yes
            </Text>
          ) : (
            <>
              <Text
                style={[
                  styles.addressText,
                  {
                    color: theme.textColor,
                    padding: 3,
                  },
                ]}
              >
                Start date: {formateDate(event.startdate)}
              </Text>
              <Text
                style={[
                  styles.addressText,
                  {
                    color: theme.textColor,
                    padding: 3,
                  },
                ]}
              >
                End date: {formateDate(event.enddate)}
              </Text>
            </>
          )}
          <Text
            style={[
              styles.addressText,
              {
                color: theme.textColor,
                padding: 3,
              },
            ]}
          >
            Start Time: {formateTime(event.starttime)}
          </Text>
          <Text
            style={[
              styles.addressText,
              {
                color: theme.textColor,
                padding: 3,
              },
            ]}
          >
            End Time: {formateTime(event.endtime)}
          </Text>
        </View>
        <View style={[styles.addressCont, { borderBottomWidth: 0 }]}>
          <Text
            style={[
              styles.addressText,
              {
                color: theme.textColor,
              },
            ]}
          >
            {event.description}
          </Text>
        </View>
      </ScrollView>
    );
  }

  function renderOptionsModal() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={modalWithOptions}
          style={{
            justifyContent: "flex-end",
            margin: 0,
          }}
          onBackdropPress={() => setModalWithOptions(false)}
          swipeDirection={["down"]}
          onSwipeComplete={() => setModalWithOptions(false)}
        >
          <View
            style={[
              styles.bottomContainer,
              {
                backgroundColor: theme.bottomSheetColor,
              },
            ]}
          >
            <TouchableOpacity
              onPress={onPressLocation}
              activeOpacity={0.8}
              style={styles.container2}
            >
              <Entypo name="location-pin" size={24} color={theme.textColor} />
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                Location
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressLike}
              activeOpacity={0.8}
              style={styles.container2}
            >
              {event.isLiked ? (
                <AntDesign name="heart" size={24} color="red" />
              ) : (
                <AntDesign name="hearto" size={24} color={theme.textColor} />
              )}
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                Like
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onShare}
              style={styles.container2}
            >
              <AntDesign name="sharealt" size={24} color={theme.textColor} />
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                Share
              </Text>
            </TouchableOpacity>
            {key === "myEvents" ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(navigationStrings.EVENTS, {
                      item: event,
                      key: "edit",
                    })
                  }
                  activeOpacity={0.8}
                  style={styles.container2}
                >
                  <Entypo name="edit" size={24} color={theme.textColor} />
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: theme.textColor,
                      },
                    ]}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressDelete}
                  activeOpacity={0.8}
                  style={styles.container2}
                >
                  <AntDesign name="delete" size={24} color="red" />
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: theme.textColor,
                      },
                    ]}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </Modal>
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
      <ScrollView
        style={[
          styles.container,
          {
            marginBottom: verticalScale(20),
            backgroundColor: theme.background,
          },
        ]}
      >
        {modalWithOptions && renderOptionsModal()}
        {renderImages()}
        {renderDetails()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetails;
