import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export default (props) => {
    return (
        <Text>
            <View>{props.text}</View>
        </Text>
    );
};