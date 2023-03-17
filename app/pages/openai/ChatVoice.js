import React from 'react';
import {View, TouchableOpacity, ScrollView, Text} from 'react-native';
import {StatusBarStyles} from "../../styles";
import ImageIcon from "../../components/ImageIcon";

const Bubble = ({children}) => (
    <TouchableOpacity
        activeOpacity={1}
        style={{
            backgroundColor: '#f3f3f3',
            padding: 15,
            borderRadius: 15,
            flex: 1,
            flexGrow: 1
        }}
    >
        {children}
    </TouchableOpacity>
)

const InputBar = () => {
    let [tips, setTips] = React.useState('按住开始说话');
    let [opacity, setOpacity] = React.useState(1);
    return (
        <View style={{
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TouchableOpacity
                style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#3777F4',
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity
                }}
                onPressIn={() => {
                    setTips('松开结束说话');
                    setOpacity(0.5)
                }}
                onPressOut={() => {
                    setTips('按住开始说话');
                    setOpacity(1);
                }}
            >
                <ImageIcon
                    size={30}
                    color={"#fff"}
                    source={require('../../assets/icons/icon-voice_fill.png')}
                />
            </TouchableOpacity>
            <View style={{marginTop: 10}}>
                <Text style={{fontSize: 16, color: '#555'}}>{tips}</Text>
            </View>
        </View>
    )
}

const BubbleTips = () => (
    <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    }}>
        <Text style={{fontSize: 22}}>AI语音对话</Text>
        <Text style={{
            fontSize: 16,
            color: '#838383',
            marginTop: 50
        }}>语音服务部适用于免费计划</Text>
    </View>
)

export default class ChatVoice extends React.Component {

    setNavigation() {
        const {navigation, route} = this.props;
        navigation.setOptions({
            title: '语音对话',
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
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView style={{padding: 20, flex: 1}} contentContainerStyle={{flex: 1}}>
                    <Bubble>
                        <BubbleTips/>
                    </Bubble>
                </ScrollView>
                <InputBar/>
            </View>
        );
    }

}
