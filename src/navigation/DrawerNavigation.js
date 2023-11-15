import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import navigationStrings from "../constants/navigationStrings";
import * as Screens from "../screens";
import { Image, useColorScheme } from "react-native";
import imagePath from "../constants/imagePath";
import styles from "../screens/Auth/Login/styles";
import colors, { darkTheme, lightTheme } from "../constants/colors";
import { textScale } from "../constants/responsiveSizes";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: theme.background,
          width: "80%",
        },
        drawerActiveTintColor: colors.buttonBackground,
        drawerInactiveTintColor: colors.black,
        drawerLabelStyle: {
          fontSize: textScale(16),
          fontFamily: "C-Regular",
          color: theme.textColor,
        },
      }}
    >
      <Drawer.Screen
        name={navigationStrings.MAP_SCREEN}
        component={Screens.MapScreen}
        options={{
          drawerLabel: "Map",
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icLocation}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={navigationStrings.EVENTS}
        component={Screens.Events}
        initialParams={{
          item: [],
          key: "",
        }}
        options={{
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icFireWorks}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={navigationStrings.MY_EVENTS}
        component={Screens.MyEvents}
        options={{
          drawerLabel: "My Events",
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icCheers}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={navigationStrings.PROFILE}
        component={Screens.Profile}
        options={{
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icProfile}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={navigationStrings.CONTRIBUTIONS}
        component={Screens.Contribution}
        options={{
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icContribution}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={navigationStrings.SETTINGS}
        component={Screens.Settings}
        options={{
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icSettings}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={navigationStrings.NEWS}
        component={Screens.News}
        options={{
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icNews}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />

      <Drawer.Screen
        name={navigationStrings.CONTACT_US}
        component={Screens.ContactUs}
        options={{
          drawerLabel: "Contact Us",
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icContactUs}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />

      <Drawer.Screen
        name={navigationStrings.FAQ}
        component={Screens.FAQ}
        options={{
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icFAQ}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={navigationStrings.RATE_APP}
        component={Screens.RateApp}
        options={{
          drawerLabel: "Rate Us",
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icStar}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      {/* <Drawer.Screen
        name={navigationStrings.SHARE_APP}
        component={Screens.ShareApp}
        options={{
          drawerLabel: "Share App",
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icShare2}
 style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      /> */}
      <Drawer.Screen
        name={navigationStrings.ABOUT_ELECTIONS}
        component={Screens.AboutElections}
        options={{
          drawerLabel: "About Us",
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icInfo}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={navigationStrings.TERMS_POLICY}
        component={Screens.TermsPolicy}
        options={{
          drawerLabel: "Terms & Conditions",
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icContract}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: theme.textColor,
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name={navigationStrings.LOGOUT}
        component={Screens.Logout}
        options={{
          drawerIcon: ({ focused, size }) => {
            return (
              <Image
                source={imagePath.icLogout}
                style={[
                  styles.drawerIcon,
                  {
                    tintColor: "red",
                  },
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default CustomDrawer;
