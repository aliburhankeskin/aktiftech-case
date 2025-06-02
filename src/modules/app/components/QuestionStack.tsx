import React from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 100;

export default function QuestionStack({
  questions,
  onSwipeLeft,
  onSwipeRight,
  currentIndex,
}: {
  questions: string[];
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  currentIndex: number;
}) {
  const translateX = useSharedValue(0);
  const swipingRight = useSharedValue(false);

  const goNext = (dir: "left" | "right") => {
    if (dir === "left") onSwipeLeft();
    else onSwipeRight();
    translateX.value = 0;
  };

  const triggerSwipe = (dir: "left" | "right") => {
    const finalX = dir === "right" ? width : -width;
    translateX.value = withTiming(finalX, {}, (finished) => {
      if (finished) runOnJS(goNext)(dir);
    });
  };

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      swipingRight.value = e.translationX > 0;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withTiming(width, {}, (finished) => {
          if (finished) runOnJS(goNext)("right");
        });
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-width, {}, (finished) => {
          if (finished) runOnJS(goNext)("left");
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${translateX.value / 20}deg` },
    ],
  }));

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    backgroundColor: swipingRight.value
      ? "rgba(76, 175, 80, 0.15)"
      : "rgba(244, 67, 54, 0.15)",
    opacity: Math.min(Math.abs(translateX.value) / SWIPE_THRESHOLD, 1),
  }));

  const isFinished = currentIndex >= questions.length;

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <View style={styles.cardContainer}>
        {isFinished ? (
          <Text style={styles.text}>Tüm sorular bitti</Text>
        ) : (
          questions.map((question, index) => {
            if (index < currentIndex) return null;
            const isTop = index === currentIndex;

            const cardStyle = [
              styles.card,
              { zIndex: questions.length - index },
              isTop ? animatedCardStyle : undefined,
            ];

            const content = (
              <Animated.View key={index} style={cardStyle}>
                {isTop && <Animated.View style={animatedOverlayStyle} />}
                <View style={styles.content}>
                  <Text style={styles.text}>{question}</Text>
                </View>
              </Animated.View>
            );

            return isTop ? (
              <GestureDetector key={index} gesture={gesture}>
                {content}
              </GestureDetector>
            ) : (
              content
            );
          })
        )}
      </View>

      {!isFinished && (
        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.red]}
            onPress={() => triggerSwipe("left")}
          >
            <Text style={styles.buttonText}>KATILMIYORUM</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.green]}
            onPress={() => triggerSwipe("right")}
          >
            <Text style={styles.buttonText}>KATILIYORUM</Text>
          </Pressable>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 60,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    width: width - 40,
    height: height * 0.4,
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  red: {
    backgroundColor: "#f44336",
  },
  green: {
    backgroundColor: "#4caf50",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
