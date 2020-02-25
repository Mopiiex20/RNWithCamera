import { Button, View, Text, Alert } from "react-native";
import React from 'react';
import { connect } from "react-redux";
import { RootState } from "../../redux/rootReduser";
import GestureRecognizer from 'react-native-swipe-gestures';


class HomeScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: 'Welcome',
    };

    onSwipe() {
        Alert.alert('Test')
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1 }}>
                <Button
                    title="Camera"
                    onPress={() => navigate('Camera')}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    login: state.login.loginData
});

export default connect(mapStateToProps)(HomeScreen)