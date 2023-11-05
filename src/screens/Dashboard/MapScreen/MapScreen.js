import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  FlatList,
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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import imagePath from "../../../constants/imagePath";
import { Image } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import constants from "../../../constants/constants";
import { moderateScale, textScale } from "../../../constants/responsiveSizes";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import dummyData from "../../../constants/dummyData";
import CustomButton from "../../../components/CustomButton";
import navigationStrings from "../../../constants/navigationStrings";

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [todaySelect, setTodaySelect] = useState(false);
  const [weekSelect, setWeekSelect] = useState(false);
  const [monthSelect, setMonthSelect] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ["25%", "58%"], []);

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
          fetchDetails={true}
          placeholder={"Search"}
          query={{
            // key: googleKey,
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
            Bowling Green, Ohio
          </Text>
        </View>
      </View>
    );
  }

  function renderShowEvents() {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(navigationStrings.ALL_EVENTS)}
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
          region={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          customMapStyle={colorScheme === "light" ? [] : mapCustomStyle}
          style={{
            flex: 1,
          }}
        />
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
                    setTodaySelect(true);
                  } else if (index === 1) {
                    setWeekSelect(true);
                  } else if (index === 2) {
                    setMonthSelect(true);
                  } else if (index === 3) {
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
          data={
            showAll
              ? dummyData.favoriteCandidate
              : dummyData.favoriteCandidate.slice(0, 5)
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.nameCont,
                selectedItems.includes(item.name) && {
                  backgroundColor: theme.buttonBackground,
                  borderWidth: 0,
                },
                ,
              ]}
              onPress={() => handleItemPress(item.name)}
            >
              <View style={styles.artistText}>
                <Text
                  style={[
                    styles.artistText,
                    {
                      color: theme.textColor,
                    },
                    selectedItems.includes(item.name) &&
                      styles.selectedArtistText,
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {dummyData.favoriteCandidate.length > 5 && (
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
              {showAll
                ? `-${dummyData.favoriteCandidate.length - 5}`
                : `+${dummyData.favoriteCandidate.length - 5}`}
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
            {renderFavoriteCandidate()}
            {renderEventTypes()}
          </ScrollView>
          <CustomButton label="Apply" />
        </View>
      </BottomSheet>
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
      {showFilterModal && renderBottomSheet()}
    </View>
  );
};

export default MapScreen;
