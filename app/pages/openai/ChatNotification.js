import React from 'react';
import {View} from 'react-native';
import {defaultNavigationConfigure} from "../../base/navconfig";

export default class ChatNotification extends React.Component {

    setNavigation() {
        const {navigation, route} = this.props;
        navigation.setOptions({
            ...defaultNavigationConfigure(navigation),
            title: '消息',
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
    }

    render() {
        return <View/>;
    }

}
