import React from "react";
import { View, Text, StyleSheet, Image, FlatList, StatusBar, AppRegistry } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Fire from "../Fire";
import styles from './style';



export default class Toolbar extends React.Component {

    render() {
        return (
            <View>
                <StatusBar backgroundColor="coral" barStyle="light-content" />
                <View style={styles.navbar}>
                    <Text style={styles.navbarTitle}>
                        {this.props.title}
                    </Text>

                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Toolbar', () => Toolbar);

