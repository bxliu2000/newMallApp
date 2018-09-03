import React, { Component } from 'React';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class PurchaseHistoryScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='rmb'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
            />
        )
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text> This is the Purchasing history Component </Text>
                <Button
                    title="Press me to goto Purchase history"
                    onPress={() => navigate('PurchaseDetail')}
                />
            </View>
        );
    }
}

export default PurchaseHistoryScreen;