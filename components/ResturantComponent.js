import React, { Component } from 'React';
import { ScrollView, Text, FlatList } from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const mapStateToProps = state => {
    return{
        restaurants: state.restaurants
    }
}
class Restaurant extends Component {
    static navigationOptions = {
        title: 'Restaurants'
    }
    
    render() {
        const renderRestaurantItem = ({item, index}) => {
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    />
            );
        }
        if (this.props.restaurants.isLoading){
            return(
                <ScrollView>
                    <Loading />
                </ScrollView>
            );
        }
        else if (this.props.restaurants.errMess){
            return(
                <Text>{this.props.restaurants.errMess}</Text>
            );
        }
        else {
            return (
                <ScrollView>
                    <FlatList
                        data = {this.props.restaurants.restaurants}
                        renderItem = {renderRestaurantItem}
                        keyExtractor={item => item.id.toString()}
                        />
                </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps)(Restaurant);