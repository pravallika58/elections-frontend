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
    backgroundColor: colors.white,
  },
  eventStyle: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: textScale(18),
    fontWeight: "bold",
    color: colors.black,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: moderateScale(50),
    marginTop: verticalScale(60),
    paddingHorizontal: moderateScale(16),
  },
  rateContainer: {
    paddingVertical: verticalScale(20),
    marginHorizontal: moderateScale(20),
    backgroundColor: colors.white,
    alignSelf: "center",
    marginTop: verticalScale(50),
    borderRadius: moderateScale(20),
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  rateText: {
    fontSize: textScale(30),
    color: colors.logoColor,
    alignSelf: "center",
    marginTop: verticalScale(20),
  },
  rateText2: {
    fontSize: textScale(14),
    color: colors.black,
    alignSelf: "center",
    marginTop: verticalScale(20),
    textAlign: "center",
    paddingHorizontal: moderateScale(20),
  },
  submitButton: {
    height: moderateScale(50),
    width: scale(300),
    backgroundColor: colors.logoColor,
    borderRadius: moderateScale(10),
    alignSelf: "center",
    marginTop: verticalScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontSize: textScale(16),
    color: colors.white,
    fontWeight: "bold",
  },
});

export default styles;
