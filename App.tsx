import { useEffect } from "react";
import { enableScreens } from "react-native-screens";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import { Platform, StatusBar } from "react-native";
import Store from "./src/store";
import RootNavigation from "./src/routers";
import CustomProvider from "./src/providers";
import ErrorBoundary from "./src/providers/ErrorBoundary";

enableScreens();

function App() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={Store}>
        <CustomProvider>
          <StatusBar barStyle="dark-content" />
          <RootNavigation />
        </CustomProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
