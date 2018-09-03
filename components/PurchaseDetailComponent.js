import React, { Component } from 'React';
import { View, Text } from 'react-native';

class PurchaseDetail extends Component {
    static navigationOptions = {
        title: 'Purchase Detail'
    }

    render() {
        return (
            <View>
                <Text> This is the Purchase Detail Component </Text>
            </View>
        );
    }
}

export default PurchaseDetail;