import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export default (props) => {
    return (
        <Text a={2} {...props}>111111<View>{props.text}</View></Text>
    );
};