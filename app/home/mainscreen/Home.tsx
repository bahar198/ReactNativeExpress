import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import logo from "../../../assets/images/Mainlogo.png";
import mainimg from "../../../assets/images/main.png";
import marketplace from "../../../assets/images/marketplace.png";
import booktime from "../../../assets/images/booktime.png";

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.headerText}>Smile Sync</Text>
      </View>

      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.lightbluebutton}>
          <Text style={styles.buttonText}>602-242-5445</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.graybutton}>
          <Text style={styles.buttonText}>CONTACT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.darkblubutton}>
          <Text style={styles.buttonText}>MAP</Text>
        </TouchableOpacity>
      </View>

      <Image source={mainimg} style={styles.mainImage} />

      <TouchableOpacity style={styles.mainButton}>
        <Text style={styles.mainButtonText}>COMPREHENSIVE DENTAL SERVICES</Text>
      </TouchableOpacity>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.smallButton}>
          <ImageBackground
            style={styles.backgroundImage}
            imageStyle={styles.imageBackgroundStyle}
            source={marketplace}
          ></ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton}>
          <ImageBackground
            style={styles.backgroundImage}
            imageStyle={styles.imageBackgroundStyle}
            source={booktime}
          ></ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.smallBlueButton}>
          <Text style={styles.smallButtonText}>PREVENTIVE SERVICES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallGrayButton}>
          <Text style={styles.smallButtonText}>MEET OUR TEAM</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackgroundStyle: {
    resizeMode: "cover",
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 100,
    marginLeft: 0,
  },
  headerText: {
    fontSize: 44,
    fontWeight: "900",
    color: "#00aaff",
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  graybutton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#dcdcdc",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  darkblubutton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#4169E1",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  lightbluebutton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#00aaff",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
  },
  mainImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  mainButton: {
    backgroundColor: "#4169E1",
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 5,
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 5,
    height: 120,
    borderRadius: 5,
    overflow: "hidden",
  },
  smallGrayButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#dcdcdc",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  smallBlueButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#00aaff",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  smallButtonText: {
    color: "#000",
    marginTop: 10,
    textAlign: "center",
  },
  smallImage: {
    width: 100,
    height: 100,
  },
});
