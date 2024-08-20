import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import Style from "./Style";
import intro from "../assets/images/intro.png";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import styles from "./Style";

const Intro = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.hero}>
        <Image source={intro} style={Style.heroImage} resizeMode="contain" />
      </View>
      <View style={Style.content}>
        <View style={Style.contentHeader}>
          <Text style={Style.title}>
            Plan your Smile Journey{"\n"}with{" "}
            <View style={Style.appName}>
              <Text style={Style.appNameText}>Smile Sync</Text>
            </View>
          </Text>
          <Text style={Style.text}>
            Aliqua ullamco incididunt elit labore consequat ipsum sunt
            exercitation aliqua duis nulla et qui fugiat
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "./home/mainscreen",
            })
          }
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Let's go</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Intro;
