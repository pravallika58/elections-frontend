import { StyleSheet } from "react-native";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: moderateScale(50),
    marginTop: verticalScale(60),
    paddingHorizontal: moderateScale(16),
  },
  eventStyle: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
  },
  aboutText: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(20),
  },
  teamImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    marginHorizontal: moderateScale(10),
  },
  mainView: {
    marginHorizontal: moderateScale(16),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  teamName: {
    fontSize: textScale(14),
    paddingTop: verticalScale(10),
  },
  teamRole: {
    fontSize: textScale(12),
    paddingTop: verticalScale(5),
  },
});

export default styles;
