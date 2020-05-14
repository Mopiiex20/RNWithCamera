import { Button, View, Alert } from "react-native";
import React from 'react';
import { connect } from "react-redux";
import { RootState } from "../../redux/rootReduser";


class HomeScreen extends React.Component<any, any> {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ marginTop:30, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                    title="Camera"
                    onPress={() => navigate('Camera')}
                />
                <Button
                    title="Contacts"
                    onPress={() => navigate('Contacts')}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    login: state.login.loginData
});

export default connect(mapStateToProps)(HomeScreen)