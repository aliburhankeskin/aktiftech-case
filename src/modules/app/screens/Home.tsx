import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import SummaryScreen from "./SummaryScreen";
import { QUESTIONS } from "../utils/QUESTIONS";
import QuestionStack from "../components/QuestionStack";

export default function HomeScreen() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (answer: number) => {
    setAnswers((prev) => [...prev, answer]);
    setIndex((prev) => prev + 1);
  };

  const restartSurvey = () => {
    setIndex(0);
    setAnswers([]);
  };

  if (index >= QUESTIONS.length) {
    return <SummaryScreen answers={answers} onRestart={restartSurvey} />;
  }

  return (
    <View style={styles.container}>
      <QuestionStack
        questions={QUESTIONS}
        onSwipeLeft={() => handleAnswer(0)}
        onSwipeRight={() => handleAnswer(1)}
        currentIndex={index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});
