import React from "react";
import navigationStrings from "../constants/navigationStrings";
import * as Screens from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomDrawer from "./DrawerNavigation";

const Main = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Main.Screen
        name={navigationStrings.CUSTOM_DRAWER}
        component={CustomDrawer}
      />
      <Main.Screen
        name={navigationStrings.DEFAULT_LOCATION}
        component={Screens.DefaultLocation}
      />
      <Main.Screen
        name={navigationStrings.LOCATION_ACCESS}
        component={Screens.LocationAccess}
      />
      <Main.Screen
        name={navigationStrings.CONGRATS}
        component={Screens.Congrats}
      />
      <Main.Screen
        name={navigationStrings.ALL_EVENTS}
        component={Screens.AllEvents}
      />
      <Main.Screen
        name={navigationStrings.EVENT_DETAILS}
        component={Screens.EventDetails}
      />
      <Main.Screen
        name={navigationStrings.MAP_ROUTE}
        component={Screens.MapRoute}
      />
      <Main.Screen
        name={navigationStrings.NEWS_VIEWER}
        component={Screens.NewsViewer}
      />
      <Main.Screen name={navigationStrings.SEARCH} component={Screens.Search} />
    </Main.Navigator>
  );
};

export default MainStack;
