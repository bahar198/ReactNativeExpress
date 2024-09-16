import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useUIStore } from "../state";
import { View, StyleSheet, Text, LayoutAnimation } from "react-native";

export default function Notification() {
  const {
    notificationTitle,
    notificationActive,
    notificationMessage,
    clearNotification,
    notificationType,
    notificationAnimationIn,
    notificationAnimationOut,
    setNotification,
  } = useUIStore((state) => ({
    notificationTitle: state.notificationTitle,
    notificationActive: state.notificationActive,
    notificationMessage: state.notificationMessage,
    clearNotification: state.clearNotification,
    notificationType: state.notificationType,
    notificationAnimationIn: state.notificationAnimationIn,
    notificationAnimationOut: state.notificationAnimationOut,
    setNotification: state.setNotification,
  }));
  useEffect(() => {
    setTimeout(() => {
      if (notificationActive) {
        clearNotification();
      }
      LayoutAnimation.spring();
    }, 4000);
  }, [notificationActive]);
  return (
    // <div
    //   aria-live="assertive"
    //   className="fixed top-24 right-0 w-full max-w-md flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-[99999]"
    // >
    //   <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
    //     <Transition
    //       show={notificationActive}
    //       as={Fragment}
    //       enter="transform ease-out duration-300 transition"
    //       enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    //       enterTo="translate-y-0 opacity-100 sm:translate-x-0"
    //       leave="transition ease-in duration-100"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
    //         <div className="p-4">
    //           <div className="flex items-start">
    //             <div className="ml-3 w-0 flex-1">
    //               <p className="text-shadow font-medium">
    //                 {notificationTitle || "Notification"}
    //               </p>
    //               <p className="mt-1 text-gray-500">{notificationMessage}</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </Transition>
    //   </div>
    // </div>
    <View style={styles.container}>
      <View style={{ backgroundColor: "red", padding: 20 }}>
        <Text>{notificationMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "auto",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
