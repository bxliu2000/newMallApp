import React, { Component } from 'React';
import { ScrollView, Text, View, SectionList, Dimensions, Image, StyleSheet, Animated} from 'react-native';
import { ListItem, Avatar, Rating, Badge, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { fetchDishes } from '../redux/ActionCreators'

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 64;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const screenHeight = Dimensions.get('window').height - 64;

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
        this.state ={
            scrollY: new Animated.Value(0),
        };
    }

    componentDidMount(){
        this.props.fetchDishes();
    }

    static navigationOptions = {
        header: null
    };

    restructureData(data) {
        const sectionData = data.reduce((acc, dish) => {
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
        return sectionData;
    }


    render() {
        const restaurant = this.props.restaurants.restaurants[this.props.navigation.getParam('restaurantId', '')];
        const sectionData = this.restructureData(this.props.dishes.dishes);
        const categories = sectionData.reduce((acc, cur) => {
            return [
                ...acc,
                {
                    category: cur.category,
                    id: sectionData.findIndex(el => el.category === cur.category)
                }
            ];
        }, []);

        const renderDishItem = ({item, index}) => {
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

        const categoryMenu = categories.map((item, index) => {
            return(
                <ListItem
                    title={item.category}
                    key={index}
                    style={{width: 100}}
                    onPress={() => this.sectionListRef.scrollToLocation({
                        itemIndex: -1,
                        sectionIndex: item.id
                    })}
                    />
            );
        });

        //ANIMATION CONST
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });
        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp'
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50],
            extrapolate: 'clamp'
        });
        const orderTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -140],
            extrapolate: 'clamp'
        })


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
                <View style = {styles.fill}>
                <Animated.View style={[styles.scrollViewContent, {transform: [{translateY: orderTranslate}]}]}>
                    <View>
                        {categoryMenu}
                    </View>
                    <SectionList
                        sections={sectionData}
                        renderItem={renderDishItem}
                        renderSectionHeader={renderSectionHeader}
                        keyExtractor={item => item.dishName}
                        ref={ref => this.sectionListRef = ref}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                        )}
                        style={{height: screenHeight}}
                    />
                </Animated.View>
                <Animated.View style={[styles.header, {height: headerHeight}]}>
                    <Animated.Image
                        style={[
                            styles.backgroundImage, 
                            {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
                        ]}
                        source={{uri: baseUrl + restaurant.image}}
                        />
                    <View style={styles.bar}>
                        <Text style={styles.title}>{restaurant.name}</Text>
                    </View>
                </Animated.View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    fill: {
        flex: 1
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#00A7E1',
        overflow: 'hidden',
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
        marginBottom: 10
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
        flexDirection: 'row', 
        alignItems: 'flex-start'
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);