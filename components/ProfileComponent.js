import React, { Component } from 'React';
import { View, Text } from 'react-native';
import {Icon} from 'react-native-elements';

class ProfileScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='user-circle'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
            />
        )
    }
    render() {
        return (
            <View>
                <Text> This is the profile page </Text>
            </View>
        );
    }
}
export default ProfileScreen;