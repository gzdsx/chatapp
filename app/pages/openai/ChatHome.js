import React from 'react';
import {View} from 'react-native';
import {defaultNavigationConfigure} from "../../base/navconfig";
import {ApplePayButton, PaymentRequest} from "react-native-payments";
import uuid from 'react-native-uuid';

export default class ChatHome extends React.Component {

    setNavigation() {
        const {navigation, route} = this.props;
        navigation.setOptions({
            ...defaultNavigationConfigure(navigation),
            title: '个人中心',
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
        return (
            <ApplePayButton style={'black'} type={'buy'} cornerRadius={10} onPress={() => {
                this.showPaymentSheet(true);
            }}/>
        );
    }

    showPaymentSheet = (succeed = true) => {
        const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
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

const DETAILS = {
    id: uuid.v4(),
    displayItems: [
        {
            label: 'Movie Ticket',
            amount: {currency: 'CNY', value: '1.00'},
        },
    ],
    total: {
        label: '贵州大师兄',
        amount: {currency: 'CNY', value: '1.00'},
    },
};
