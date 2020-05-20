import React, { Component } from "react";
import { Navigator } from "react-native-deprecated-custom-components";
import { Platform, StyleSheet, Text, NativeModules } from "react-native";
let { NMRCTImmersionModule } = NativeModules;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    sceneContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "#000",
    },
});

class App extends Component {
    getNavComponent() {
        return Platform.select({
            ios: () => require("@music/rn-deprecated-navigator-ios"),
            android: () => Navigator,
        })();
    }

    render() {
        const Navigator = this.getNavComponent();
        return (
            <Navigator
                initialRoute={{ title: "Awesome Scene", index: 0 }}
                renderScene={(route, navigator) => (
                    <Text>Hello {route.title}!</Text>
                )}
                style={styles.container}
                sceneStyle={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "stretch",
                    backgroundColor: "#000",
                }}
            />
        );
    }
}

export default App;