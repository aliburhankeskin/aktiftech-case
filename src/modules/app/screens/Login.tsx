import React, { useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { showToast } from "@helpers/toast/showToast";
import { SetUser } from "@modules/app/redux/appSlice";
import Logo from "@assets/images/icon.png";

export default function Login() {
  const dispatch = useDispatch();

  const goHomePage = useCallback(() => {
    showToast("Welcome");

    dispatch(SetUser({ name: "Ali Burhan Keskin" }));
  }, []);

  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />

      <TouchableOpacity style={styles.buttonStyle} onPress={goHomePage}>
        <Text style={styles.labelStyle}>Ankete Sayfasına Git</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonStyle: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    width: 200,
  },
  labelStyle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
