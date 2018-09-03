import React, {Component} from 'React';
import SuperHomeNavigator from './MainNavigator';
import {View, Platform} from 'react-native'

class Main extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <SuperHomeNavigator />
            </View>
        );
    }
}

export default Main;