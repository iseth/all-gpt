import React, { useRef } from "react";
import { Animated } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const SwipeToDelete = ({ children, onDelete }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const panRef = useRef();

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === 5) {
      if (nativeEvent.translationX < -100) {
        Animated.timing(translateX, {
          toValue: -500,
          duration: 200,
          useNativeDriver: true,
        }).start(() => onDelete());
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={{ transform: [{ translateX }] }}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SwipeToDelete;
