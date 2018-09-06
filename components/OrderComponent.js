import React, { Component } from 'React';
import { ScrollView, Text, View, SectionList } from 'react-native';
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
        const sectionData = this.props.dishes.dishes.reduce((acc, dish) => {
            const foundIndex = acc.findIndex(el => el.category === dish.category);
            if (foundIndex === -1) {
                return [
                    ...acc,
                    {
                        category: dish.category,
                        data: [{
                            dishName: dish.dishName,
                            dishDescription: dish.dishDescription,
                            price: dish.price, 
                            salesPerMonth: dish.salesPerMonth,
                            likes: dish.likes,
                            image: dish.image
                        }],
                    },
                ];
            }
            acc[foundIndex].data = [...acc[foundIndex].data, {
                dishName: dish.dishName,
                dishDescription: dish.dishDescription,
                price: dish.price,
                salesPerMonth: dish.salesPerMonth,
                likes: dish.likes,
                image: dish.image
            }];
            return acc;
        }, []);


        const renderDishItem = ({item, index, section}) => {
            return(
                <ListItem
                    key={index}
                    title={item.dishName}
                    subtitle={item.dishDescription}
                />  
            );
        }

        const renderSectionHeader = ({section: {category}}) => {
            return(
                <Text style={{ fontWeight: 'bold' }}>{category}</Text>
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
                    <SectionList
                        sections={sectionData}
                        renderItem={renderDishItem}
                        renderSectionHeader={renderSectionHeader}
                        keyExtractor={item => item.dishName}
                    />
                    
                </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);