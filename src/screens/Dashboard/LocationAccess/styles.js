import { StyleSheet } from "react-native";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchBarCont: {
    top: moderateScale(20),
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(30),
  },
  favoriteLocation: {
    paddingHorizontal: scale(49),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    borderBottomWidth: 0.2,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: textScale(16),
    fontWeight: "700",
    fontFamily: "C-Regular",
    color: "#000000",
  },
  subTitleStyle: {
    fontSize: textScale(11),
    fontWeight: "600",
    fontFamily: "C-Regular",
    color: "grey",
  },
  favoriteStyleCont: {
    borderBottomWidth: 0.2,
    borderColor: "grey",
    paddingBottom: verticalScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoriteStyle: {
    paddingHorizontal: scale(49),
    fontSize: textScale(20),
    fontWeight: "700",
    fontFamily: "C-Regular",
    color: "#000000",
    paddingTop: verticalScale(20),
  },
});

export default styles;
