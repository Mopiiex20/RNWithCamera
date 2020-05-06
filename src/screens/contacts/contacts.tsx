import { PermissionsAndroid, View, Text } from "react-native";
import React from 'react';
import { connect } from "react-redux";
import { RootState } from "../../redux/rootReduser";


class ContactsScreen extends React.Component<any, any> {
    state: any = {
        permissionsContacts: false
    }

    componentDidMount() {
        PermissionsAndroid.check('android.permission.READ_CONTACTS').then(
            (response: boolean) => {
                if (!response) {
                    PermissionsAndroid.request('android.permission.READ_CONTACTS').then(
                        (granted) => {
                            console.log(granted);
                            
                            this.setState({ permissionsContacts: granted})
                        }
                    )
                }

            }
        )
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                {
                    this.state.permissionsContacts ?
                        <Text>Contacts</Text>
                        :
                        <Text>NO Contacts found :(</Text>
                }
            </View>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    login: state.login.loginData
});

export default connect(mapStateToProps)(ContactsScreen)