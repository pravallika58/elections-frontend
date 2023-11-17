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
  },
  picContainer: {
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
  cameraContainer: {
    position: "absolute",
    bottom: verticalScale(-10),
    right: scale(30),
  },
  uploadPic: {
    marginTop: verticalScale(10),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: verticalScale(20),
  },
  uploadPictureText: {
    fontSize: textScale(16),
    fontFamily: "C-Regular",
    fontWeight: "bold",
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
