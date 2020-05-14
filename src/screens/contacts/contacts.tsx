import { PermissionsAndroid, View, Text, ScrollView } from "react-native";
import React from 'react';
import { connect } from "react-redux";
import { RootState } from "../../redux/rootReduser";
import Contacts from 'react-native-contacts';
import { ContactView } from "../../components/camera/contact-card";

type State = {
    permissionsContacts: boolean,
    contacts: Contacts.Contact[]
}

export default class ContactsScreen extends React.Component<any, State> {
    state: any = {
        permissionsContacts: false,
        contacts: []
    }

    componentDidMount() {
        PermissionsAndroid.check('android.permission.READ_CONTACTS').then(
            (response: boolean) => {
                if (!response) {
                    PermissionsAndroid.request('android.permission.READ_CONTACTS').then(
                        (status) => {
                            this.setState({ permissionsContacts: status === 'granted' ? true : false });
                            Contacts.getAll(
                                (error: any, contacts: Contacts.Contact[]) => {
                                    this.setState({ contacts: [...contacts] });
                                }
                            )
                        }
                    )
                } else {
                    Contacts.getAll(
                        (error: any, contacts: Contacts.Contact[]) => {
                            this.setState({ contacts: [...contacts], permissionsContacts: response });
                        }
                    )
                }
            }
        )
    }

    render() {
        return (
            <ScrollView style={{ marginBottom: 30, marginHorizontal: 10, flexDirection: 'column' }}>
                {
                    this.state.permissionsContacts ?
                        this.state.contacts.length !== 0 ?
                            this.state.contacts.map(
                                (contact: Contacts.Contact, index: number) => {
                                    return (
                                        <ContactView key={index} contact={contact} />
                                    )
                                }
                            ) : null
                        :
                        <Text>NO Contacts found :(</Text>
                }
            </ScrollView>
        );
    }
}