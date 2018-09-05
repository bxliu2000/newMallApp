import React, { Component } from 'React';
import { ScrollView, Text, FlatList, View } from 'react-native';
import { ListItem, Avatar, Rating, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { fetchDishes } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return{
        restaurants: state.restaurants,
        dishes: state.dishes
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchDishes: () => {
        const restaurantId = ownProps.navigation.getParam('restaurantId', '');
        dispatch(fetchDishes(restaurantId));
    }
})

class OrderScreen extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchDishes();
    }

    static navigationOptions = {
        title: " "
    }

    render() {
        const renderDishItem = ({item, index}) => {
            return(
                <ListItem
                    key={index}
                    title={item.dishName}
                    subtitle={item.dishDescription}
                />  
            );
            
        }
        if (this.props.dishes.isLoading) {
            return (
                <ScrollView>
                    <Loading />
                </ScrollView>
            );
        }
        else if (this.props.dishes.errMess) {
            return (
                <Text>{this.props.dishes.errMess}</Text>
            );
        }
        else {
            return (
                <ScrollView>
                    <FlatList
                        data={this.props.dishes.dishes}
                        renderItem={renderDishItem}
                        keyExtractor={item => item.dishName.toString()}
                    />
                    
                </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);