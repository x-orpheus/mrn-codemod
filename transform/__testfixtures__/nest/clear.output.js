import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export default props => {
    return (
        <View>
            <View>{props.text}</View>
        </View>
    );
};