import { StyleSheet } from "react-native";
import {
  moderateScale,
  scale,
  verticalScale,
} from "../../../constants/responsiveSizes";

const styles = StyleSheet.create({
  MapStyle: {
    flex: 1,
  },
  mapPinContainer: {
    position: "absolute",
    height: moderateScale(54),
    width: moderateScale(54),
    borderRadius: moderateScale(27),
    backgroundColor: "white",
    top: verticalScale(130),
    left: scale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  pinStyle: {
    height: moderateScale(38),
    width: moderateScale(38),
  },
  customHeaderContainer: {
    borderBottomWidth: 0.5,
    paddingBottom: verticalScale(20),
    marginHorizontal: 0,
    paddingHorizontal: scale(16),
    borderColor: "grey",
    marginTop: verticalScale(60),
  },
});

export default styles;
