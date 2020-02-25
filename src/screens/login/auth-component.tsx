import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { req } from '../../requset';
import { connect } from 'react-redux';
import { doLogin } from '../../redux/actions/login'

interface AuthProps {
    doLogin: Function,
    navigation: any
}
interface AuthState {
    email: string,
    password: string,
    token: string
}


class AuthScreen extends Component<AuthProps, AuthState>{
    state: AuthState = {
        email: '',
        password: '',
        token: ''
    }

    login = () => {
        const { doLogin } = this.props;
        doLogin(
            'LoggedIn'
        )
        const { navigate } = this.props.navigation;
        navigate('Home');


        // const loginData = {
        //     username: this.state.email,
        //     password: this.state.password
        // }
        // req('login', 'POST', loginData).then((res) => {
        //     this.setState({
        //         token: res.token
        //     })
        // });
    }

    render() {
        let b = true;
        return (
            <View>
                <Text>Email : {this.state.email}</Text>
                <TextInput value={this.state.email} onChangeText={(text) => this.setState({ email: text })}></TextInput>
                <Text>Pass : {this.state.password}</Text>
                <TextInput  secureTextEntry={true} value={this.state.password} onChangeText={(text) => this.setState({ password: text })}></TextInput>
                <Button title='LOGIN' onPress={this.login}></Button>

                <Text>Token : {this.state.token}</Text>

            </View>

        );
    }
}



export default connect(null, { doLogin })(AuthScreen)

