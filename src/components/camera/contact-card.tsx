import { View, Text, Image } from "react-native";
import React from 'react';
import Contacts from 'react-native-contacts';
import ContactImage from '../../assets/images/Google_Contacts_icon.svg'

type Props = {
    contact: Contacts.Contact
}

export class ContactView extends React.Component<Props, any> {

    render() {
        const { contact } = this.props;
        return (
            <View style={{ flex: 1, marginTop: 30, flexDirection: 'row', justifyContent: 'flex-start' }}>
                {!contact.hasThumbnail ?
                    <ContactImage style={{ flex: 1 }} width={'50'} height={'50'} />
                    :
                    <Image style={{ flex: 1 }} width={50} height={50} source={{ uri: contact.thumbnailPath }} />
                }
                <View style={{ flex: 3, marginLeft: 20, justifyContent: 'space-between', paddingVertical: 3 }}>
                    <Text style={{ fontSize: 16 }}>{contact.displayName}</Text>
                    <Text>{contact.phoneNumbers.length !== 0 ? contact.phoneNumbers[0].number : 'No phone numbers'}</Text>
                </View>
            </View>
        );
    }
}