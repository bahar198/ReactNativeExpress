import { View, Text, Button } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomDrawerContent from "../../components/customDrawerContent";
import UserLogin from "../../components/UserLogin";

export default function _layout() {
  return (
    <Drawer
      initialRouteName="mainscreen"
      screenOptions={{
        drawerLabelStyle: {
          marginLeft: -20,
        },
        // drawerActiveBackgroundColor: 'gray',
        // drawerActiveTintColor: 'white',
        // drawerInactiveTintColor: 'white'
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="mainscreen"
        options={{
          drawerLabel: "Home",
          title: "Home",
          headerRight: () => <UserLogin />,
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="servicescreen"
        options={{
          drawerLabel: "Service",
          title: "Service",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="server" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "About",
          title: "About",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
