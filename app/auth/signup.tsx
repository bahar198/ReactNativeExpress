import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FeatherIcon from "react-native-vector-icons/Feather";
import { SubmitHandler, useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
interface Input {
  userName: string;
  Email: string;
  password: string;
}
export default function Signup() {
  const { handleSubmit, register, watch } = useForm<Input>();
  const { post } = useApi();
  const password = watch("password");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const onSubmit: SubmitHandler<Input> = async ({
    userName,
    Email,
    password,
  }) => {
    const result = await post("/user/signup", { userName, Email, password });
    return;
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPassword = e.target.value;
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords don't match");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <View style={styles.headerBack}>
              <FeatherIcon color="#1D2A32" name="chevron-left" size={30} />
            </View>

            <Text style={styles.title}>Let's Get Started!</Text>

            <Text style={styles.subtitle}>
              Fill in the fields below to get started with your new account.
            </Text>
          </View>
          <form
            className="space-y-8 divide-y divide-gray-200  w-full"
            style={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <View style={styles.input}>
              <Text style={styles.inputLabel}>UserName</Text>
              <input
                type="text"
                style={styles.inputControl}
                placeholder="John Doe"
                {...register("userName", { required: true })}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <input
                type="email"
                style={styles.inputControl}
                placeholder="john@example.com"
                {...register("Email", { required: true })}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <input
                type="password"
                style={styles.inputControl}
                placeholder="********"
                {...register("password", { required: true })}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <input
                type="password"
                style={styles.inputControl}
                placeholder="********"
                onChange={(val) => handleConfirmPasswordChange(val)}
              />
              {confirmPasswordError && (
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
              )}
            </View>

            <button style={styles.btn} type="submit">
              Get Started
            </button>
          </form>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => {
            //
          }}
          style={{ marginTop: "auto" }}
        >
          <Text style={styles.formFooter}>
            Already have an account?{" "}
            <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  /** Header */
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  headerBack: {
    padding: 8,
    paddingTop: 0,
    position: "relative",
    marginLeft: -16,
    marginBottom: 6,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  errorText: {
    color: "#FF6347", // A vibrant tomato red color
    fontSize: 14, // Slightly smaller font size
    fontWeight: "bold", // Bold text to make the error stand out
    marginTop: 5, // Space between the input field and the error text
    textAlign: "left", // Align the error text to the left
    letterSpacing: 0.5, // Slightly increased letter spacing for readability
    backgroundColor: "#f8d7da", // Light red background for emphasis
    padding: 8, // Padding around the text for a bubble effect
    borderRadius: 4, // Rounded corners for the error text box
  },
});
