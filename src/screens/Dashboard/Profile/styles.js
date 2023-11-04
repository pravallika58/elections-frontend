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
  userProfile: {
    width: moderateScale(210),
    height: moderateScale(210),
    borderRadius: moderateScale(105),
    marginTop: moderateScale(20),
    alignSelf: "center",
  },
  starting: {
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: textScale(20),
    fontFamily: "C-Regular",
    color: colors.black,
    fontWeight: "700",
    paddingTop: moderateScale(10),
  },
  inputLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  customHeaderContainer: {
    borderBottomWidth: 0.5,
    paddingBottom: verticalScale(20),
    marginHorizontal: 0,
    paddingHorizontal: scale(16),
    borderColor: "grey",
  },
});

export default styles;
