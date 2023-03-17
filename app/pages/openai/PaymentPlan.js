import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {defaultNavigationConfigure} from "../../base/navconfig";
import {Size, StatusBarStyles} from "../../styles";
import {ListItem} from "react-native-elements";
import {ApiClient} from "../../utils";
import {PaymentRequest} from "react-native-payments";
import uuid from 'react-native-uuid';

const PlanList = ({dataList}) => {
    return dataList.map((plan, index) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    paddingVertical: 30,
                    paddingHorizontal: 15,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    shadowColor: '#EFEFEF',
                    shadowOffset: {width: 1, height: 10},
                    shadowRadius: 15,
                    shadowOpacity:0.5,
                    borderWidth: 1,
                    borderColor: '#efefef',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: Size.screenWidth / 3,
                    flexGrow:1
                }}
                key={index.toString()}
                onPress={()=>showPaymentSheet(plan)}
            >
                <Text style={{
                    fontSize: 20,
                    color: '#555',
                    marginBottom: 20
                }}>{plan.desc}</Text>
                <Text style={{
                    fontSize: 22,
                    fontWeight: '600',
                    color: '#f40',
                }}>￥{plan.price}</Text>
            </TouchableOpacity>
        )
    })
}

const METHOD_DATA = [
    {
        supportedMethods: ['apple-pay'],
        data: {
            merchantIdentifier: 'merchant.cn.gzdsx.merchant-id',
            supportedNetworks: ['visa', 'mastercard', 'amex', 'chinaunionpay'],
            countryCode: 'CN',
            currencyCode: 'CNY',
            // // uncomment this block to activate automatic Stripe tokenization.
            // // try putting your key pk_test... in here and see how the token format changes.
            // paymentMethodTokenizationParameters: {
            // 	parameters: {
            // 		gateway: 'stripe',
            // 		'stripe:publishableKey': Config.STRIPE_KEY,
            // 	},
            // },
        },
    },
];

const showPaymentSheet = (plan) => {
    const paymentRequest = new PaymentRequest(METHOD_DATA, {
        id:uuid.v4(),
        total:{
            label: 'Chat助手',
            amount: {currency: 'CNY', value: plan.price},
        },
        displayItems:[
            {
                label: plan.desc,
                amount: {currency: 'CNY', value: plan.price},
            }
        ]
    });
    paymentRequest.show().then(paymentResponse => {
        console.log(paymentResponse);
        const card_token = paymentResponse.details.paymentToken;

        if (succeed) {
            paymentResponse.complete('success')
            console.info(`Payment request completed with card token ${card_token}`);
        } else {
            paymentResponse.complete('failure')
            console.info('Payment request failed');
        }
    }).catch(error => {
        console.log(error.message);
        if (error.message === 'AbortError') {
            console.info('Payment request was dismissed');
        }
    });
};

export default class PaymentPlan extends React.Component {

    setNavigation() {
        const {navigation, route} = this.props;
        navigation.setOptions({
            ...defaultNavigationConfigure(navigation),
            title: '付费计划',
            headerRight: () => null
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            dayPlans: [],
            pointPlans: []
        };
    }

    componentDidMount() {
        this.setNavigation();
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            StatusBarStyles.setToDarkStyle();
        });

        ApiClient.get('/openai/paymentplan.getList').then(response => {
            let dayPlans = [], pointPlans = [];
            response.result.items.map(item => {
                if (item.type === 1) {
                    dayPlans.push(item)
                } else {
                    pointPlans.push(item);
                }
            })
            this.setState({dayPlans, pointPlans});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1, padding: 15, backgroundColor: '#fff'}}>
                    <ListItem containerStyle={styles.sectionHeader}>
                        <ListItem.Title style={styles.sectionTitle}>计费规则说明</ListItem.Title>
                    </ListItem>
                    <ListItem containerStyle={styles.contentRow}>
                        <ListItem.Content>
                            <Text style={styles.contentText}>不同功能单次消耗的硬币可能不同：</Text>
                            <Text style={styles.contentText}>1、AI聊天 ：单次1硬币</Text>
                            <Text style={styles.contentText}>2、语音对话和所有的快捷工具：单次0.8硬币</Text>
                            <Text style={styles.contentText}>人数过多时，AI可能出现异常，这种情况不消耗任何硬币
                                如果重复购买按月订阅或按周订阅，将在已有订阅
                                到期时间后自动延期</Text>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem containerStyle={styles.sectionHeader}>
                        <ListItem.Title style={styles.sectionTitle}>按月订阅</ListItem.Title>
                    </ListItem>
                    <View style={styles.planWrap}>
                        <PlanList dataList={this.state.dayPlans}/>
                    </View>
                    <ListItem containerStyle={styles.sectionHeader}>
                        <ListItem.Title style={styles.sectionTitle}>购买点数</ListItem.Title>
                    </ListItem>
                    <View style={styles.planWrap}>
                        <PlanList dataList={this.state.pointPlans}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

}


const styles = StyleSheet.create({
    sectionHeader: {
        paddingVertical: 15,
        paddingHorizontal: 0,
        borderBottomColor: '#efefef',
        borderBottomWidth: 0.5
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '400'
    },
    contentRow: {
        paddingVertical: 15,
        paddingHorizontal: 0,
    },
    contentText: {
        fontSize: 16,
        color: '#8E8E8E',
        lineHeight: 24
    },
    planWrap:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 30,
        paddingVertical:20,
        justifyContent:'space-around'
    }
})
