import React from 'react';
import {Image, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ListItem} from "react-native-elements";
import {defaultNavigationConfigure} from "../../base/navconfig";
import quickNavs from "./quickNavs";
import {StatusBarStyles} from "../../styles";

const NavList = ({dataList}) => {
    let contents = dataList.map((nav, index) => (
        <TouchableOpacity
            key={index.toString()}
            activeOpacity={0.7}
            style={{
                backgroundColor: '#fff',
                borderRadius: 15,
                padding: 15,
                shadowOpacity: 0.5,
                shadowOffset: {width: 6, height: 6},
                shadowColor: '#e5e5e5',
                borderWidth: 1,
                borderColor: '#efefef'
            }}
        >
            <Text style={{fontSize: 18}}>{nav.title}</Text>
        </TouchableOpacity>
    ))

    return (
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flexGrow: 1,
            gap: 30,
            padding: 15,
        }}>
            {contents}
        </View>
    )
}

export default class ChatQuickly extends React.Component {

    setNavigation() {
        const {navigation, route} = this.props;
        navigation.setOptions({
            ...defaultNavigationConfigure(navigation),
            title: '快捷工具',
            headerLeft: () => null,
            headerRight: () => null
        })
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.setNavigation();
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBarStyles.setToDarkStyle();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: '#fff', paddingVertical: 15}}>
                {
                    quickNavs.map((group, index) => (
                        <View key={index.toString()}>
                            <ListItem>
                                <ListItem.Title style={styles.sesctionTitle}>{group.title}</ListItem.Title>
                            </ListItem>
                            <NavList dataList={group.data}/>
                        </View>
                    ))
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    sesctionTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    rowTitle: {
        fontSize: 18
    },
    rowContainer: {
        paddingVertical: 15,
        paddingHorizontal: 0,
        borderBottomColor: '#e9e9e9',
        borderBottomWidth: 0.5
    }
})
