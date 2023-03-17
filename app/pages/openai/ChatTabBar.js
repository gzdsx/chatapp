import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatApp from "./ChatApp";
import ChatHome from "./ChatHome";
import ChatQuickly from "./ChatQuickly";
import ChatVoice from "./ChatVoice";
import HomeIndex from "./HomeIndex";

function iconStyle(tintColor) {
    return {
        width: 26,
        height: 26,
        tintColor: tintColor,
    };
}

const Tab = createBottomTabNavigator();

class ChatTabBar extends React.Component {
    render() {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#0F8EE9',
                    tabBarInactiveTintColor: '#777',
                    tabBarShowLabel:false,
                    tabBarStyle:{
                        backgroundColor:'#fdfdfd'
                    }
                }}
            >
                <Tab.Screen
                    name="ChatApp"
                    component={ChatApp}
                    options={{
                        tabBarIcon: ({focused, color, size}) => (
                            <Image
                                source={require('../../assets/tabbar/mark_fill.png')}
                                style={iconStyle(color)}
                            />
                        ),
                    }}

                />
                <Tab.Screen
                    name="ChatVoice"
                    component={ChatVoice}
                    options={{
                        tabBarIcon: ({focused, color, size}) => (
                            <Image
                                source={require('../../assets/tabbar/voice_fill.png')}
                                style={iconStyle(color)}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="ChatQuickly"
                    component={ChatQuickly}
                    options={{
                        tabBarIcon: ({focused, color, size}) => (
                            <Image
                                source={require('../../assets/tabbar/discover_fill.png')}
                                style={iconStyle(color)}
                            />
                        ),
                    }}

                />
                <Tab.Screen
                    name="HomeIndex"
                    component={HomeIndex}
                    options={{
                        tabBarIcon: ({focused, color, size}) => (
                            <Image
                                source={require('../../assets/tabbar/mine-fill.png')}
                                style={iconStyle(color)}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

// TabBar.navigationOptions = () => ({
//     headerShown: false,
//     header: () => null
// })

export default ChatTabBar;
