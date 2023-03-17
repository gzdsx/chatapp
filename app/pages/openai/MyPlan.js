import React from 'react';
import {View} from 'react-native';
import {defaultNavigationConfigure} from "../../base/navconfig";
import {StatusBarStyles} from "../../styles";

export default class MyPlan extends React.Component {

    setNavigation() {
        const {navigation, route} = this.props;
        navigation.setOptions({
            ...defaultNavigationConfigure(navigation),
            title: '我的计划',
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
        return <View/>;
    }

}
