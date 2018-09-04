import React, { Component } from 'React';
import { View, Text } from 'react-native';

class Restaurant extends Component {
    static navigationOptions = {
        title: 'Restaurants'
    }
    
    render() {
        return (
            <View>
                <Text> This is the Resturant Component </Text>
            </View>
        );
    }
}

export default Restaurant;