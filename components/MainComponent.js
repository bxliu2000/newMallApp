import React, {Component} from 'React';
import SuperHomeNavigator from './MainNavigator';
import {View, Platform} from 'react-native'
import {connect} from 'react-redux';


const mapStateToProps = state => {
    return {
        restaurants: state.restaurants
    }
}

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

export default connect(mapStateToProps)(Main);