import React from 'react';
import {ScrollView, Animated, StyleSheet, View, Share, Linking} from 'react-native';
import {lightNavigationConfigure} from "../../base/navconfig";
import HomeHead from "./HomeHead";
import {connect} from "react-redux";
import {ListItem} from 'react-native-elements';
import ImageIcon from "../../components/ImageIcon";
import {SafeFooter} from "../../components/SafeView";
import {Size, StatusBarStyles} from "../../styles";
import {AppUrl} from "../../base/constants";

const ActionRow = ({title, iconSource, onPress = () => null}) => {
    return (
        <ListItem containerStyle={styles.row} onPress={onPress}>
            <ImageIcon
                source={iconSource}
                size={23}
                color={"#444"}
            />
            <ListItem.Content>
                <ListItem.Title style={styles.title}>{title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron/>
        </ListItem>
    )
}

class HomeIndex extends React.Component {

    setNavigation() {
        const {navigation, route} = this.props;
        navigation.setOptions({
            ...lightNavigationConfigure(navigation),
            title: '',
            headerTransparent: true,
            headerLeft: () => null
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            scrollY: new Animated.Value(0),
        };
    }

    componentDidMount() {
        this.setNavigation();
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBarStyles.setToLightStyle();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    renderHeaderView = () => {
        let {scrollY} = this.state
        let {oauth, userInfo, navigation} = this.props;
        let height = Size.screenWidth * 0.65;
        return (
            <Animated.Image
                //onLoad={() => this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})} // for android blur
                pointerEvents='none'
                style={[styles.headerView, {
                    height,
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [-height, 0, height],
                                outputRange: [0, 0, -height],
                            })
                        },
                        {
                            scale: scrollY.interpolate({
                                inputRange: [-height, 0, height],
                                outputRange: [2, 1, 1]
                            })
                        },
                    ]
                }]}
                source={require('../../assets/home/home-head.png')}
                resizeMode={'stretch'}
            />
        )
    }

    render() {
        let {oauth, userInfo, navigation} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: '#F1F1EF', position: 'relative'}}>
                {this.renderHeaderView()}
                <ScrollView
                    style={styles.scrollView}
                    scrollEventThrottle={16}
                    onScroll={event => {
                        Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}], {
                            useNativeDriver: false
                        }).call(this, event)
                    }}
                >
                    <View style={{height: Size.screenWidth * 0.35}}/>
                    <HomeHead userInfo={userInfo} isAuthenticated={oauth.isAuthenticated}/>
                    <View style={styles.body}>
                        <ActionRow
                            title={"付费计划"}
                            iconSource={require('../../assets/home/resume.png')}
                            onPress={() => this.showView('payment-plan')}
                        />
                        <ActionRow
                            title={"我的计划"}
                            iconSource={require('../../assets/home/favorite.png')}
                            onPress={() => this.showView('my-plan')}
                        />
                        <ActionRow
                            title={"邀请码"}
                            iconSource={require('../../assets/home/zhinan.png')}
                            onPress={() => this.showView('invite-code')}
                        />
                        <ActionRow
                            title={"发个好评"}
                            iconSource={require('../../assets/home/haoping.png')}
                            onPress={() => {
                                Linking.openURL('itms-apps://itunes.apple.com/cn/app/id1544829486?mt=8&action=write-review')
                            }}
                        />
                        <ActionRow
                            title={"分享给好友"}
                            iconSource={require('../../assets/home/share.png')}
                            onPress={() => {
                                Share.share({
                                    url: AppUrl,
                                    title: '分享给好友',
                                    message: '邀请您一起玩ChatGPT',
                                });
                            }}
                        />

                        <ActionRow
                            title={"联系我们"}
                            iconSource={require('../../assets/home/contactus.png')}
                            onPress={() => {

                            }}
                        />
                        <ActionRow
                            title={"反馈与建议"}
                            iconSource={require('../../assets/home/feedback.png')}
                            onPress={() => this.showView('feedback')}
                        />
                        <ActionRow
                            title={"用户协议"}
                            iconSource={require('../../assets/home/agreement.png')}
                        />
                        <ActionRow
                            title={"隐私协议"}
                            iconSource={require('../../assets/home/privacy.png')}
                        />
                    </View>
                    <SafeFooter/>
                </ScrollView>
            </View>
        );
    }

    showView = (route, params) => {
        let {oauth, navigation} = this.props;
        if (oauth.isAuthenticated) {
            navigation.navigate(route, params);
        } else {
            navigation.navigate('signin');
        }
    }
}

const styles = StyleSheet.create({
    row: {
        paddingVertical: 20,
    },
    title: {
        color: '#444',
        fontSize: 16
    },
    headerView: {
        //backgroundColor: Colors.backgroundColor,
        zIndex: 0,
        width: Size.screenWidth,
        marginTop: -5,
        resizeMode: 'cover'
    },
    scrollView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 100
    },
    body: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 15,
        overflow: 'hidden'
    }
});

const mapStateToProps = (store) => {
    return store;
};

export default connect(mapStateToProps)(HomeIndex);
