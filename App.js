import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Provider } from "react-redux";
import configureStore from "./App/reducers";
const store = configureStore();

// import AppNavigator from './navigation/AppNavigator';
import AppNavigator from "./App/Containers/Navigation/AppNavigator";
import AppNavigators from "./App/Containers/Navigation/AppNavigators";
import HomeScreen from "./App/Containers/Home/index";

import { isSignedIn, onSignIn } from "./App/auth";

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      </View>
    );
  }
}

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       signedIn: false,
//       checkedSignIn: false
//     };
//   }

//   componentDidMount() {
//     isSignedIn()
//       .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
//       .catch(err => alert("An error occurred"));

//       console.log(onSignIn,'onSignIn')
//   }

//   render() {
//     const { checkedSignIn, signedIn } = this.state;

//     // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
//     if (!checkedSignIn) {
//       return null;
//     }

//     if (!signedIn) {
//       return (
//         <View style={styles.container}>
//           {Platform.OS === "ios" && <StatusBar barStyle="default" />}
//           {/* <AppNavigator /> */}
//           <Provider store={store}>
//             <AppNavigators />
//           </Provider>
//         </View>
//       );
//     } else {
//       return (
//         <View style={styles.container}>
//           {Platform.OS === "ios" && <StatusBar barStyle="default" />}
//           <Provider store={store}>
//             <AppNavigator />
//           </Provider>
//         </View>
//       );
//     }
//   }
// }

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
