import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
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
import { Calendar } from "react-native-calendars";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import imagePath from "../../../constants/imagePath";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import constants, { GOOGLE_API_KEY } from "../../../constants/constants";
import { moderateScale, textScale } from "../../../constants/responsiveSizes";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../../components/CustomButton";
import navigationStrings from "../../../constants/navigationStrings";
import { getAllEvents } from "../../../redux/actions/event";
import { getData } from "../../../utils/helperFunctions";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import Modal from "react-native-modal";

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.09,
    longitudeDelta: 0.02,
  });
  const [todaySelect, setTodaySelect] = useState(false);
  const [weekSelect, setWeekSelect] = useState(false);
  const [monthSelect, setMonthSelect] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [defaultStart, setDefaultStart] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latOfDetails, setLatOfDetails] = useState(0);
  const [title, setTitle] = useState("");
  const [lngOfDetails, setLngOfDetails] = useState(0);
  const [events, setEvents] = useState([]);
  const [calendarModal, setCalendarModal] = useState(false);
  const [data, setData] = useState([]);
  const [creator, setCreator] = useState([]);
  const [mapType, setMapType] = useState("standard");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ["25%", "58%"], []);
  const mapViewRef = useRef();
  const markedDates = {};

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getEvents();
      getMapMode();
      fetchData();
    }, [])
  );

  if (events !== 0) {
    events.forEach((event) => {
      const eventDate = event.startdate.split("T")[0];
      markedDates[eventDate] = { marked: true };
    });
  }

  const getMapMode = async () => {
    try {
      const res = await getData("mapType");
      const parsedRes = JSON.parse(res);

      if (parsedRes && parsedRes.key) {
        setMapType(parsedRes.key);
      } else {
        setMapType("standard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }
      const location = await getCurrentPositionAsync({});
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_API_KEY}`
      );
      const result = await response.json();
      const firstResult = result.results[0];
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
      const res = await getData("selectedDefaultLocation");
      const data = JSON.parse(res);
      if (data) {
        setData(data);
        data.cur ? setTitle(data.subLabel) : setTitle(data.label);

        if (data.lat && data.long) {
          const newRegion = {
            latitude: data.lat,
            longitude: data.long,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
        }
      } else {
        setTitle(cityState);
        setDefaultStart(cityState);
        const newRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEvents = async () => {
    try {
      const response = await getAllEvents();
      setEvents(response);
      await compareUserId(response);
    } catch (error) {
      console.log(error);
    }
  };

  const compareUserId = async (res) => {
    try {
      const id = await getData("userId");
      let creators = [];

      if (res.length > 0) {
        res.forEach((item) => {
          if (item.isLiked) {
            const likedByUser = item.likedBy.filter((item2) => item2 == id);
            if (likedByUser) {
              creators.push(item.eventcreator);
            }
          }
        });
      }

      setCreator(creators);
    } catch (error) {
      console.error("Error in compareUserId: ", error);
    }
  };

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setShowFilterModal(false);
    }
  }, []);

  const handleItemPress = (itemName) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const handleTypePress = (event) => {
    if (selectedTypes.includes(event)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== event));
    } else {
      setSelectedTypes([...selectedTypes, event]);
    }
  };

  const filterEvents = () => {
    setShowFilterModal(false);
    const filteredEvents = events.filter((event) => {
      const isSelectedCandidate = selectedItems.includes(event.eventcreator);
      const isSelectedType = selectedTypes.includes(event.type);
      return isSelectedCandidate || isSelectedType;
    });
    if (data !== null) {
      const currentLocation = defaultStart.toLowerCase();
      const filteredEvent = filteredEvents.filter((event) => {
        const eventLocation = event.city.toLowerCase();
        return currentLocation.includes(eventLocation);
      });
      navigation.navigate(navigationStrings.ALL_EVENTS, {
        dataEvents: filteredEvent,
        key: "mapFilter",
      });
      setSelectedItems([]);
      setSelectedTypes([]);
    } else {
      const location = data.cur
        ? data.subLabel.toLowerCase()
        : data.label.toLowerCase();
      const filteredEvent = filteredEvents.filter((event) => {
        const eventLocation = event.city.toLowerCase();
        return location.includes(eventLocation);
      });
      navigation.navigate(navigationStrings.ALL_EVENTS, {
        dataEvents: filteredEvent,
        key: "mapFilter",
      });
      setSelectedItems([]);
      setSelectedTypes([]);
    }
  };

  const todayFilterEvents = () => {
    const filteredEventsToday = events.filter((event) => {
      const todayDate = new Date().toISOString().split("T")[0];
      const eventDate = event.startdate.split("T")[0];

      return todayDate === eventDate;
    });

    if (data !== null) {
      const currentLocation = defaultStart.toLowerCase();
      const filteredEvents = filteredEventsToday.filter((event) => {
        const eventLocation = event.city.toLowerCase();
        return currentLocation.includes(eventLocation);
      });
      navigation.navigate(navigationStrings.ALL_EVENTS, {
        dataEvents: filteredEvents,
        key: "today",
      });
      setActiveTab(null);
    } else {
      const location = data.cur
        ? data.subLabel.toLowerCase()
        : data.label.toLowerCase();

      const filteredEvents = filteredEventsToday.filter((event) => {
        const eventLocation = event.city.toLowerCase();
        return location.includes(eventLocation);
      });
      navigation.navigate(navigationStrings.ALL_EVENTS, {
        dataEvents: filteredEvents,
        key: "today",
      });
      setActiveTab(null);
    }
  };

  const weekFilterEvents = () => {
    const filteredEventsWeek = events.filter((event) => {
      const todayDate = new Date().toISOString().split("T")[0];
      const nextSevenDays = new Date();
      nextSevenDays.setDate(nextSevenDays.getDate() + 7);
      const nextSevenDaysFormatted = nextSevenDays.toISOString().split("T")[0];
      const eventDate = event.startdate.split("T")[0];
      return todayDate <= eventDate && eventDate <= nextSevenDaysFormatted;
    });

    if (data !== null) {
      const currentLocation = defaultStart.toLowerCase();
      const filteredEvents = filteredEventsWeek.filter((event) => {
        const eventLocation = event.city.toLowerCase();
        return currentLocation.includes(eventLocation);
      });
      navigation.navigate(navigationStrings.ALL_EVENTS, {
        dataEvents: filteredEvents,
        key: "week",
      });
      setActiveTab(null);
    } else {
      const location = data.cur
        ? data.subLabel.toLowerCase()
        : data.label.toLowerCase();
      const filteredEvents = filteredEventsWeek.filter((event) => {
        const eventLocation = event.city.toLowerCase();
        return location.includes(eventLocation);
      });

      navigation.navigate(navigationStrings.ALL_EVENTS, {
        dataEvents: filteredEvents,
        key: "week",
      });
      setActiveTab(null);
    }
  };

  const monthlyFilterEvents = () => {
    const filteredEventsMonthly = events.filter((event) => {
      const todayDate = new Date().toISOString().split("T")[0];
      const nextThirtyDays = new Date();
      nextThirtyDays.setDate(nextThirtyDays.getDate() + 30);
      const nextThirtyDaysFormatted = nextThirtyDays
        .toISOString()
        .split("T")[0];
      const eventDate = event.startdate.split("T")[0];
      return todayDate <= eventDate && eventDate <= nextThirtyDaysFormatted;
    });
    if (data !== null) {
      const currentLocation = defaultStart.toLowerCase();
      const filteredEvents = filteredEventsMonthly.filter((event) => {
        const eventLocation = event.city.toLowerCase();
        return currentLocation.includes(eventLocation);
      });
      navigation.navigate(navigationStrings.ALL_EVENTS, {
        dataEvents: filteredEvents,
        key: "month",
      });
      setActiveTab(null);
    } else {
      const location = data.cur
        ? data.subLabel.toLowerCase()
        : data.label.toLowerCase();
      const filteredEvents = filteredEventsMonthly.filter((event) => {
        const eventLocation = event.city.toLowerCase();
        return location.includes(eventLocation);
      });
      navigation.navigate(navigationStrings.ALL_EVENTS, {
        dataEvents: filteredEvents,
        key: "month",
      });
      setActiveTab(null);
    }
  };

  const filterEventsByDay = (selectedDay) => {
    setCalendarModal(false);
    const filtered = events.filter((event) => {
      const eventDate = event.startdate.split("T")[0];
      return eventDate === selectedDay.dateString;
    });
    if (data !== null) {
      const currentLocation = defaultStart.toLowerCase();
      const filteredEvents = filtered.filter((event) => {
        const eventLocation = event.city.toLowerCase();
        return currentLocation.includes(eventLocation);
      });
      navigation.navigate(navigationStrings.ALL_EVENTS, {
        dataEvents: filteredEvents,
        key: "calendar",
      });
      setActiveTab(null);
    } else {
      const location = data.cur
        ? data.subLabel.toLowerCase().trim()
        : data.label.toLowerCase().trim();

      const filteredEvents = filtered.filter((event) => {
        const eventLocation = event.city.toLowerCase().trim();
        return location.includes(eventLocation);
      });
      navigation.navigate(navigationStrings.ALL_EVENTS, {
        dataEvents: filteredEvents,
        key: "calendar",
      });
      setActiveTab(null);
    }
  };

  const handleCalendar = () => {
    return (
      <Modal
        onBackdropPress={() => setCalendarModal(false)}
        isVisible={calendarModal}
      >
        <View style={styles.modalView}>
          <Calendar
            onDayPress={(day) => {
              filterEventsByDay(day);
            }}
            markedDates={markedDates}
          />
        </View>
      </Modal>
    );
  };

  function handleSearchBar() {
    return (
      <View style={styles.searchBarCont}>
        <GooglePlacesAutocomplete
          styles={{
            textInputContainer: {
              backgroundColor: theme.inputContainer,
              width: "98%",
              borderRadius: moderateScale(25),
            },
            textInput: {
              fontSize: textScale(15),
              backgroundColor: theme.inputContainer,
              color: theme.textColor,
              borderRadius: moderateScale(25),
            },
          }}
          onPress={(data, details = null) => {
            if (details) {
              const { lat, lng } = details.geometry.location;
              setLatOfDetails(lat);
              setLngOfDetails(lng);
              mapViewRef.current.animateToRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }
          }}
          fetchDetails={true}
          placeholder={"Search"}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
        <TouchableOpacity
          onPress={() => setShowFilterModal(true)}
          activeOpacity={0.8}
          style={[
            styles.filterCont,
            {
              backgroundColor: theme.bottomSheetColor,
            },
          ]}
        >
          <Image
            source={imagePath.icFilter}
            style={[
              styles.filterIcon,
              {
                tintColor: theme.textColor,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={[
          styles.headerAgain,
          {
            backgroundColor: theme.bottomSheetColor,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.openDrawer()}
        >
          <Image
            source={imagePath.icMenu}
            style={[
              styles.menuIcon,
              {
                tintColor: theme.textColor,
              },
            ]}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={[
              styles.headerText,
              {
                color: theme.textColor,
              },
            ]}
          >
            Elections
          </Text>
          <Text
            style={[
              styles.headerText2,
              {
                color: theme.textColor,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      </View>
    );
  }

  function renderShowEvents() {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(navigationStrings.ALL_EVENTS, {
            data: events,
            key: "",
          })
        }
        activeOpacity={0.8}
        style={[
          styles.showEventsCont,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <View
          style={[
            styles.rectangle,
            {
              backgroundColor: theme.bottomSheetColor,
            },
          ]}
        >
          <Image
            source={imagePath.icMenu}
            style={{
              width: moderateScale(20),
              height: moderateScale(20),
              tintColor: theme.textColor,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  function renderMaps() {
    return (
      <>
        <MapView
          mapType={mapType}
          ref={mapViewRef}
          region={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          customMapStyle={colorScheme === "light" ? [] : mapCustomStyle}
          style={{
            flex: 1,
          }}
        >
          {latOfDetails !== 0 && lngOfDetails !== 0 && (
            <Marker
              coordinate={{
                latitude: latOfDetails,
                longitude: lngOfDetails,
              }}
            />
          )}
          {data.lat && data.long && (
            <Marker
              coordinate={{
                latitude: data.lat,
                longitude: data.long,
              }}
            />
          )}
          {events.map((event, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(event.latitude),
                  longitude: parseFloat(event.longitude),
                }}
                onPress={() =>
                  navigation.navigate(navigationStrings.EVENT_DETAILS, {
                    eventId: event._id,
                    key: "map",
                  })
                }
                title={event.eventname}
              />
            );
          })}
        </MapView>
        {renderHeader()}
        {renderShowEvents()}
        {handleSearchBar()}
      </>
    );
  }

  function renderFooter() {
    return (
      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.bottomSheetColor,
          },
        ]}
      >
        {/* Tabs */}
        <View
          style={[
            styles.tabContainer,
            {
              backgroundColor: theme.bottomSheetColor,
            },
          ]}
        >
          {constants.tabs.map((tab, index) => {
            const { icon, name } = tab;
            const tabStyle =
              index === activeTab
                ? {
                    padding: moderateScale(8),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: moderateScale(8),
                    backgroundColor: theme.buttonBackground,
                  }
                : {
                    padding: moderateScale(8),
                    alignItems: "center",
                    borderRadius: moderateScale(8),
                    backgroundColor: theme.bottomSheetColor,
                  };
            return (
              <TouchableOpacity
                key={index}
                style={tabStyle}
                onPress={() => {
                  setActiveTab(index);
                  if (index === 0) {
                    todayFilterEvents();
                    setTodaySelect(true);
                  } else if (index === 1) {
                    weekFilterEvents();
                    setWeekSelect(true);
                  } else if (index === 2) {
                    monthlyFilterEvents();
                    setMonthSelect(true);
                  } else if (index === 3) {
                    setCalendarModal(true);
                  }
                }}
              >
                <Image
                  source={icon}
                  style={[
                    styles.tabIcon,
                    {
                      tintColor:
                        index === activeTab
                          ? theme.buttonTextColor
                          : theme.textColor,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        index === activeTab
                          ? theme.buttonTextColor
                          : theme.textColor,
                    },
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  function renderFavoriteCandidate() {
    return (
      <View style={styles.mainCont}>
        <Text
          style={[
            styles.heading,
            {
              color: theme.textColor,
            },
          ]}
        >
          Favorite Candidate
        </Text>

        <FlatList
          contentContainerStyle={styles.flatList}
          numColumns={3}
          data={showAll ? creator : creator.slice(0, 5)}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.nameCont,
                selectedItems.includes(item) && {
                  backgroundColor: theme.buttonBackground,
                  borderWidth: 0,
                },
                ,
              ]}
              onPress={() => handleItemPress(item)}
            >
              <View style={styles.artistText}>
                <Text
                  style={[
                    styles.artistText,
                    {
                      color: theme.textColor,
                    },
                    selectedItems.includes(item) && styles.selectedArtistText,
                  ]}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {creator.length > 5 && (
          <TouchableOpacity
            onPress={() => setShowAll(!showAll)}
            style={[
              styles.showAllButton,
              {
                backgroundColor: theme.buttonBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.showAllText,
                {
                  color: theme.textColor,
                },
              ]}
            >
              {showAll ? `-${creator.length - 5}` : `+${creator.length - 5}`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function renderEventTypes() {
    return (
      <View style={styles.mainCont}>
        <Text
          style={[
            styles.heading,
            {
              color: theme.textColor,
            },
          ]}
        >
          Event Types
        </Text>
        <FlatList
          contentContainerStyle={styles.flatList}
          numColumns={3}
          data={constants.typeOfArtEvent}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.nameCont,
                selectedTypes.includes(item.name) && {
                  backgroundColor: theme.buttonBackground,
                  borderWidth: 0,
                },
                ,
              ]}
              onPress={() => handleTypePress(item.name)}
            >
              <View style={styles.artistText}>
                <Text
                  style={[
                    styles.artistText,
                    {
                      color: theme.textColor,
                    },
                    selectedTypes.includes(item.name) &&
                      styles.selectedArtistText,
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
        backgroundStyle={[
          styles.backgroundStyle,
          {
            backgroundColor: theme.bottomSheetColor,
          },
        ]}
      >
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: theme.bottomSheetColor,
            },
          ]}
        >
          <View style={styles.filterLayout}>
            <Text
              style={[
                styles.selectText,
                {
                  color: theme.textColor,
                },
              ]}
            >
              Filter
            </Text>
            <MaterialIcons
              onPress={() => setShowFilterModal(false)}
              name="highlight-remove"
              size={24}
              color={theme.textColor}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: "70%",
            }}
          >
            {creator.length > 0 && renderFavoriteCandidate()}
            {renderEventTypes()}
          </ScrollView>
          <CustomButton onPress={filterEvents} label="Apply" />
        </View>
      </BottomSheet>
    );
  }

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: theme.background,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={theme.textColor} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background2,
        },
      ]}
    >
      {renderMaps()}
      {renderFooter()}
      {calendarModal && handleCalendar()}
      {showFilterModal && renderBottomSheet()}
    </View>
  );
};

export default MapScreen;
