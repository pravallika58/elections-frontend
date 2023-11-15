import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from "../../../constants/responsiveSizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    marginHorizontal: moderateScale(16),
    marginTop: moderateScale(60),
    height: moderateScale(50),
    flexDirection: "row",
    backgroundColor: colors.white,
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIcon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  logo: {
    width: moderateScale(250),
    height: moderateScale(52),
    alignSelf: "center",
  },
  layout: {
    flex: 1,
  },
  nameOfSinger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(42),
    marginTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  singerNameText: {
    fontSize: textScale(20),
    fontWeight: "300",
    color: colors.black,
    fontFamily: "C-Regular",
  },
  plusCont: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    height: moderateScale(15),
    width: moderateScale(15),
  },
  addressCont: {
    paddingHorizontal: scale(42),
    marginTop: verticalScale(20),
    paddingBottom: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  addressText: {
    fontWeight: "300",
    fontSize: textScale(15),
    color: colors.black,
    fontFamily: "C-Regular",
  },
  bottomContainer: {
    backgroundColor: colors.white,
    padding: moderateScale(16),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scale(20),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(20),
  },
  shareIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginRight: scale(7),
  },
  textStyle: {
    fontSize: textScale(18),
    fontFamily: "C-Regular",
    color: colors.black,
    marginLeft: scale(10),
  },
  pagination: {
    position: "absolute",
    bottom: verticalScale(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(10),
    alignSelf: "center",
  },
});

export default styles;
