import type { ReactNode } from "react";
import { Stack } from "expo-router";
import Notification from "../../components/Notification";
export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signup" />
      </Stack>
      <Notification />
    </>
  );
}
