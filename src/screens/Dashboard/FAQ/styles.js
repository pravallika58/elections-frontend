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

  description: {
    marginHorizontal: scale(20),
  },
  content: {
    marginTop: verticalScale(20),
  },
  header: {
    marginTop: verticalScale(40),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: textScale(16),
    fontWeight: "700",
    fontFamily: "C-Regular",
    color: "#000000",
  },
  downArrow: {
    width: moderateScale(16),
    height: moderateScale(16),
  },
  contentText: {
    fontSize: textScale(14),
    fontWeight: "400",
    fontFamily: "C-Regular",
    color: "#000000",
  },
  bigTitleCont: {
    marginTop: verticalScale(10),
    alignItems: "center",
    paddingBottom: verticalScale(20),
    borderBottomWidth: 0.5,
    borderColor: "grey",
  },
  bigTitle: {
    fontSize: textScale(20),
    fontWeight: "700",
    fontFamily: "C-Regular",
    color: colors.black,
  },
});

export default styles;
