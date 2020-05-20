import React, { Component } from "react";
import ListView from "@music/rn-deprecated-listview";
import { Text, View } from "react-native";

export default class App extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    name: "张三",
                    email: "e.moore@thompson.org",
                },
                {
                    name: "李四",
                    email: "r.jackson@johnson.edu",
                },
            ]),
        };
    }

    renderRow(item) {
        return (
            <View>
                <Text>姓名：{item.name}</Text>
                <Text>邮箱：{item.email}</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={item => this.renderRow(item)}
                />
            </View>
        );
    }
}