import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from "react-native-fast-image";
import {Colors} from "../../styles";

const styles = StyleSheet.create({
    data: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dataNum: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 6
    },
    dataText: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        color: '#fff'
    }
});

export default ({userInfo = {}, isAuthenticated = false}) => {
    let navigation = useNavigation();
    let source = isAuthenticated ? {uri: userInfo.avatar} : require('../../assets/common/avatar_default.png');
    return (
        <View style={{
            flexDirection: 'row',
            paddingVertical: 20,
            paddingHorizontal: 15,
        }}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    marginRight: 50,
                    flex: 1
                }}
                activeOpacity={1}
                onPress={() => {
                    if (isAuthenticated) {
                        navigation.navigate('profile-index');
                    } else {
                        navigation.navigate('signin');
                    }
                }}
            >
                <View style={{justifyContent: 'center', marginRight: 15}}>
                    <FastImage source={source}
                               style={{
                                   width: 90,
                                   height: 90,
                                   borderRadius: 45,
                                   borderColor: '#e5e5e5',
                                   borderWidth: 3
                               }}
                    />
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: '#fff',
                        fontWeight: '600'
                    }}>{isAuthenticated ? userInfo.nickname : '请登录'}</Text>
                </View>
            </TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                    style={{fontSize: 16, color: '#fff'}}
                    suppressHighlighting={true}
                    onPress={() => {
                        navigation.navigate('home-profile-edit');
                    }}>编辑</Text>
            </View>
        </View>
    );
}
