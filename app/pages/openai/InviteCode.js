import React from 'react';
import {Text, View} from 'react-native';
import {defaultNavigationConfigure} from "../../base/navconfig";
import {ButtonStyles, StatusBarStyles} from "../../styles";
import {Button} from "react-native-elements";
import {ApiClient} from "../../utils";
import Clipboard from "@react-native-clipboard/clipboard";
import {LoadingView, Toast} from "react-native-gzdsx-elements";

export default class InviteCode extends React.Component {

    setNavigation() {
        const {navigation, route} = this.props;
        navigation.setOptions({
            ...defaultNavigationConfigure(navigation),
            title: '邀请码',
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            loading: true
        };
    }

    componentDidMount() {
        this.setNavigation();
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBarStyles.setToDarkStyle();
        });

        ApiClient.get('/user/invite.getCode').then(response => {
            this.setState({code: response.result, loading: false});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let {code, loading} = this.state;
        if (loading) return <LoadingView/>;
        return (
            <View style={{paddingHorizontal: 30, paddingVertical: 50, alignItems: 'center'}}>
                <View style={{marginBottom: 50}}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 32,
                        fontWeight: 'bold'
                    }}>{code}</Text>
                </View>
                <Button
                    title={"复制"}
                    buttonStyle={[ButtonStyles.primary, {width: '100%'}]}
                    onPress={() => {
                        Clipboard.setString(code);
                        Toast.success('验证码复制成功');
                    }}
                />
            </View>
        );
    }

}
