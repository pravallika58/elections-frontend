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
    color: colors.black,
  },
  card: {
    flexDirection: "row",
    marginVertical: moderateScale(10),
    backgroundColor: colors.white,
  },
  image: {
    width: moderateScale(141),
    height: moderateScale(127),
    borderRadius: moderateScale(10),
  },
  cardTitle: {
    fontSize: textScale(15),
    fontWeight: "300",
    color: colors.black,
    paddingLeft: scale(11),
  },
  cardSubTitle: {
    fontSize: textScale(15),
    fontWeight: "300",
    color: colors.black,
    paddingLeft: scale(11),
    paddingTop: verticalScale(12),
  },
  flatlistCont: {
    flex: 1,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
    marginHorizontal: scale(16),
  },
  cardText: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: scale(10),
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
