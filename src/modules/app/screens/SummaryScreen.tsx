// SummaryScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function SummaryScreen({
  answers,
  onRestart,
}: {
  answers: number[];
  onRestart: () => void;
}) {
  const positive = answers.filter((a) => a === 1).length;
  const negative = answers.filter((a) => a === 0).length;

  return (
    <View style={styles.container}>
      <Text style={styles.doneText}>Anket Tamamlandı ✅</Text>
      <Text style={styles.resultText}>Katıldığınız: {positive} soru</Text>
      <Text style={styles.resultText}>Katılmadığınız: {negative} soru</Text>
      <Pressable style={styles.restartButton} onPress={onRestart}>
        <Text style={styles.restartText}>TEKRAR BAŞLA</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  doneText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  restartButton: {
    marginTop: 30,
    backgroundColor: "#2196f3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  restartText: {
    color: "white",
    fontWeight: "bold",
  },
});
