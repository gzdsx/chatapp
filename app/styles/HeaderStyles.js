import {StyleSheet, Platform} from 'react-native';
import Colors from "./Colors";

const HeaderStyles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#f9f9f9',
        shadowOffset: {height: 0.5, width: 0.5},
        shadowColor:'#e5e5e5'
    },
    headerTitleStyle: {
        fontSize: 18
    },
    headerLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: Platform.select({
            ios: -6,
            android: 0
        })
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: 10,
    },
});


export default HeaderStyles;
