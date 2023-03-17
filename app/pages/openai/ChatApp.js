import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {defaultNavigationConfigure} from "../../base/navconfig";
import {GiftedChat, Send, Bubble, InputToolbar, Composer, Actions} from "react-native-gifted-chat";
import axios from "axios";
import uuid from 'react-native-uuid';
import {LoadingView} from "react-native-gzdsx-elements";
import {StatusBarStyles} from "../../styles";
import {ApiClient} from "../../utils";

const otherUser = {
    _id: 2,
    name: 'React Native',
    avatar: require('../../assets/AI.png'),
}

export default class ChatApp extends React.Component {

    setNavigation() {
        const {navigation, route} = this.props;
        navigation.setOptions({
            ...defaultNavigationConfigure(navigation),
            title: 'AI问答',
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    _id: uuid.v4(),
                    text: 'Hi！我是Chat精灵，您可以问我任何问题。',
                    createdAt: new Date(),
                    user: otherUser,
                }
            ]
        };

        this.onSend = this.onSend.bind(this);
        this.onRequestChatGpt = this.onRequestChatGpt.bind(this);
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

    onSend(messages) {
        this.setState(prevSate => ({
            messages: GiftedChat.append(prevSate.messages, messages)
        }), () => {
            this.onRequestChatGpt(messages[0]);
        });
    }

    onRequestChatGpt(message) {
        if (!message.text) return;
        this.setState(prevSate => ({
            messages: GiftedChat.append(prevSate.messages, [
                {
                    _id: uuid.v4(),
                    text: '思考中......',
                    user: otherUser
                }
            ])
        }), () => {
            //this.sendRequest(message.text);
            ApiClient.post('/openai/completions', {prompt: message.text}).then(response => {
                //console.error(response);
                let message = response.result;
                message.user = otherUser;

                let {messages} = this.state;
                messages[0] = message;
                this.setState({messages});

            }).catch(reason => {
                //console.error(reason);
            });
        });
    }

    sendRequest = async (prompt) => {
        const response = await fetch('https://chatapi.songdewei.com/api/openai/completions', {
            method: "POST",
            body: JSON.stringify({prompt}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        //获取UTF8的解码
        const encode = new TextDecoder("utf-8");
        //获取body的reader
        const reader = response.body.getReader();
        // 循环读取reponse中的内容
        while (true) {
            const {done, value} = await reader.read();
            console.log(value);
            if (done) {
                break;
            }
            // 解码内容
            const text = encode.decode(value);
            // 当获取错误token时，输出错误信息
            if (text === "<ERR>") {
                //output.innerText = "Error";
                break;
            } else {
                // 获取正常信息时，逐字追加输出
                //output.innerText += text;
            }
        }
    }

    render() {
        let {messages} = this.state;
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <GiftedChat
                    messages={messages}
                    onSend={this.onSend}
                    user={{_id: 1}}
                    placeholder={"请输入聊天内容"}
                    wrapInSafeArea={false}
                    dateFormat={'YYYY-MM-DD'}
                    timeFormat={'hh:mm:ss'}
                    renderLoading={() => <LoadingView/>}
                    renderAvatarOnTop={true}
                    renderBubble={props => (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                left: {
                                    marginRight: 20,
                                    padding: 5
                                },
                                right: {
                                    padding: 5
                                }
                            }}
                            optionTitles={['复制文本', '取消']}
                            onPress={() => {

                            }}
                            onLongPress={() => {

                            }}
                            renderTime={() => null}
                        />
                    )}
                    listViewProps={{
                        contentContainerStyle: {
                            flexGrow: 1,
                            justifyContent: 'flex-end',
                        },
                        style: {
                            flex: 1,
                            paddingVertical: 15
                        }
                    }}
                    renderComposer={props => (
                        <View style={{
                            flex: 1,
                            paddingVertical: 5,
                            marginRight: 5
                        }}>
                            <Composer
                                {...props}
                                textInputStyle={{
                                    borderWidth: 0.5,
                                    borderRadius: 6,
                                    borderColor: '#e5e5e5',
                                    paddingHorizontal: 15,
                                    backgroundColor: '#fff',
                                    textAlignVertical: 'center',
                                    marginTop: 0,
                                    marginBottom: 0,
                                    height: 40,
                                    paddingTop: 10
                                }}
                            />
                        </View>
                    )}
                    renderSend={(props) => (
                        <View style={{
                            padding: 5
                        }}>
                            <Send
                                {...props}
                                label={"发送"}
                                textStyle={{
                                    color: '#fff',
                                    fontSize: 16,
                                    marginBottom: 0
                                }}
                                containerStyle={{
                                    backgroundColor: '#3777F4',
                                    borderRadius: 6,
                                    height: 36,
                                    paddingHorizontal: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            />
                        </View>
                    )}
                    alwaysShowSend={true}
                    renderInputToolbar={props => (
                        <InputToolbar
                            {...props}
                            containerStyle={{
                                backgroundColor: '#efefef'
                            }}
                        />
                    )}
                />
            </SafeAreaView>
        );
    }
}
