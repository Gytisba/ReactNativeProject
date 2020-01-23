import React from "react";
import { View, Text, StyleSheet, Image, FlatList, StatusBar, AppRegistry, ListView, TouchableHighlight, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import firebase from 'firebase';
import FirebaseKeys from "../config";
import styles from './style';
import Toolbar from './Toolbar';
import Fire from "../Fire";

const firebaseApp = firebase.initializeApp(FirebaseKeys);

export default class HomeScreen extends React.Component {

  unsubscribe = null;
    constructor(){
        super();
        let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            text:'',
	    user: {},
            itemDataSource: ds,
            modalVisible: false
        }
        this.itemsRef = this.getRef().child('items');

        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
    }

    setModalVisible(visible){
        this.setState({modalVisible:visible});
    }

    getRef(){
        return firebaseApp.database().ref();
    }

    componentWillMount(){
        this.getItems(this.itemsRef);
    }
    componentDidMount(){
        this.getItems(this.itemsRef);

    }

	componentDidMount() {
        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data() });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    
    
    getItems(itemsRef){
       itemsRef.on('value',(snap)=>{
        let items = [];
        snap.forEach((child)=>{
            items.push({
                title: child.val().title,
                _key: child.key
            });
        });
        this.setState({
            itemDataSource: this.state.itemDataSource.cloneWithRows(items)
        })
       });
    }

    pressRow(item){
        this.itemsRef.child(item._key).remove();
        
    }

    renderRow(item){
        return(
            <TouchableHighlight onPress={()=>{
                this.pressRow(item);
            }}>
                <View style={styles.li}>
                    <Text style={styles.liText}>
                        {item.title}                Ordered by:           
                        {this.state.user.name}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    addItem(){
        this.setModalVisible(true);
    }

    render() {
        return (
            <View style={styles.container}>
                
                <Toolbar title="Current orders:" />
                <ListView 
                dataSource={this.state.itemDataSource}
                renderRow={this.renderRow}
                />
                    
                
            </View>
            
        );
    }
}

AppRegistry.registerComponent('itemlister', () => itemlister);

