import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Header from "../../../components/Header";
import { textScale, verticalScale } from "../../../constants/responsiveSizes";
import { darkTheme, lightTheme } from "../../../constants/colors";
import imagePath from "../../../constants/imagePath";
import Input from "../../../components/Input";
import CustomButton from "../../../components/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showSucess } from "../../../utils/helperFunctions";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { getMyDetails, updateUser } from "../../../redux/actions/auth";
import { Image } from "expo-image";

const Profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);

  const [userImage, setUserImage] = useState([]);
  const [saveImage, setSaveImage] = useState([]);
  const [uploadPicture, setUploadPicture] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const onPressUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("images", {
        uri: userImage.uri,
        type: userImage.type,
        name: userImage.fileName,
      });
      const res = await updateUser(formData);
      showSucess("User updated successfully");
      setUploadPicture(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // showError(error?.message);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await getMyDetails();
      setFirstName(res.data.firstname);
      setLastName(res.data.lastname);
      setEmail(res.data.email);
      setSaveImage(res.data.images[0].url);
    } catch (error) {
      console.log(error);
    }
  };

  const onTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    setUserImage(result.assets[0]);
    setUploadPicture(false);
  };

  const onChoosePhoto = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(results);
    if (results.canceled) {
      return;
    }
    setUserImage(results.assets[0]);
    setUploadPicture(false);
  };

  function renderHeader() {
    return (
      <Header
        onPressEdit={() => setEdit(true)}
        showRightIcon={true}
        label="Profile"
        showRightArrow={true}
        onPressArrow={() => navigation.goBack()}
        customLabelStyle={{
          fontSize: textScale(24),
        }}
        customHeaderContainer={styles.customHeaderContainer}
      />
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      {renderHeader()}
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.picContainer}>
          <Image
            source={
              userImage.uri
                ? { uri: userImage.uri }
                : saveImage
                ? { uri: saveImage.toString() }
                : imagePath.icDefault
            }
            style={styles.userProfile}
          />

          {edit ? (
            <TouchableOpacity
              onPress={() => setUploadPicture(true)}
              style={styles.uploadPic}
            >
              <Text
                style={[
                  styles.uploadPictureText,
                  {
                    color: theme.textColor,
                  },
                ]}
              >
                Upload picture
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {uploadPicture ? (
          <Modal
            onBackdropPress={() => setUploadPicture(false)}
            isVisible={uploadPicture}
          >
            <View style={styles.modalView}>
              <CustomButton label="Take Photo" onPress={onTakePhoto} />
              <CustomButton label="Choose Photo" onPress={onChoosePhoto} />
            </View>
          </Modal>
        ) : null}

        <Input
          editable={edit ? true : false}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          placeholder="First Name"
          label="First Name"
          customContainerStyle={{
            marginTop: verticalScale(40),
          }}
        />
        <Input
          editable={edit ? true : false}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          placeholder="Last Name"
          label="Last Name"
          customContainerStyle={{
            marginTop: verticalScale(10),
          }}
        />

        <Input
          editable={false}
          keyboardType={"email-address"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="eg:abc@gmail.com"
          label="Email"
          customContainerStyle={{
            marginTop: verticalScale(10),
          }}
        />
      </KeyboardAwareScrollView>
      {edit ? (
        <CustomButton
          isLoading={loading}
          onPress={onPressUpdate}
          label="Save"
          customStyles={{
            marginBottom: verticalScale(10),
          }}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Profile;
