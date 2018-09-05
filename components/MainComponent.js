import React, {Component} from 'React';
import SuperHomeNavigator from './MainNavigator';
import {View, Platform} from 'react-native'
import {connect} from 'react-redux';
import {fetchRestaurants} from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
        restaurants: state.restaurants
    }
}

const mapDispatchToProps = dispatch => ({
    fetchRestaurants: () => dispatch(fetchRestaurants())
})
class Main extends Component {

    componentDidMount() {
        this.props.fetchRestaurants();
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);