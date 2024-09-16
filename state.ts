import { iNotificationDismiss } from "react-notifications-component";
import { create } from "zustand";
export interface UIState {
  notificationTitle: string;
  notificationMessage: string;
  notificationType: string;
  notificationActive: boolean;
  notificationInsert: string;
  notificationContainer: string;
  notificationAnimationIn: string[];
  notificationAnimationOut: string[];
  notificationDismiss: iNotificationDismiss;
  setNotification: (
    title: string,
    message: string,
    type: "success" | "danger" | "info" | "default" | "warning",
    insert?: "top" | "bottom",
    container?: "top-right" | "top-left" | "bottom-right" | "bottom-left",
    animationIn?: string[], // Define this as an array of strings
    animationOut?: string[], // Define this as an array of strings
    dismiss?: iNotificationDismiss
  ) => void;
  clearNotification: () => void;
}
export const useUIStore = create<UIState>((set, get) => ({
  notificationTitle: "",
  notificationMessage: "",
  notificationType: "success",
  notificationActive: false,
  notificationInsert: "top",
  notificationContainer: "top-right",
  notificationAnimationIn: ["animate__animated", "animate__fadeIn"],
  notificationAnimationOut: ["animate__animated", "animate__fadeOut"],
  notificationDismiss: {
    duration: 5000,
    onScreen: true,
  },
  setNotification: (
    title: string,
    message: string,
    type: "success" | "danger" | "info" | "default" | "warning",
    insert?: "top" | "bottom",
    container?: "top-right" | "top-left" | "bottom-right" | "bottom-left",
    animationIn?: string[], // Define this as an array of strings
    animationOut?: string[], // Define this as an array of strings
    dismiss?: iNotificationDismiss
  ) => {
    set(() => ({
      notificationTitle: title,
      notificationMessage: message,
      notificationType: type,
      notificationActive: true,

      notificationInsert: insert,
      notificationContainer: container,
      notificationAnimationIn: animationIn,
      notificationAnimationOut: animationOut,
      notificationDismiss: dismiss,
    }));
  },
  clearNotification: () => {
    set(() => ({
      notificationTitle: "",
      notificationMessage: "",
      notificationType: "warning",
      notificationActive: false,
    }));
  },
}));
