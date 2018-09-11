import React, { Component } from 'React';
import { ScrollView, Text, View, SectionList, Dimensions, Image, StyleSheet, Animated} from 'react-native';
import { ListItem, Avatar, Rating, Badge, Card, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { fetchDishes } from '../redux/ActionCreators'

const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 64;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const screenHeight = Dimensions.get('window').height;

const mapStateToProps = state => {
    return{
        restaurants: state.restaurants,
        dishes: state.dishes
    }
}
function DiscountBadges(props) {
    const labels = props.labels;
    return (
        labels.map((item) => (
            <Badge
                key={item}
                value={item}
                containerStyle={{ backgroundColor: '#FFF1F2', margin: 2, borderColor: 'red', borderWidth: 1 }}
                textStyle={{ fontSize: 10, color: 'red' }}
            />
        ))
    );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchDishes: () => {
        const restaurantId = ownProps.navigation.getParam('restaurantId', '');
        dispatch(fetchDishes(restaurantId));
    }
})

function AboutRestaurantCard(props) {
    const restaurant = props.restaurant;
    return(
        <View>
        <Card title={restaurant.name} titleStyle={{ justifyContent: 'flex-start' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Avatar
                    source={{ uri: baseUrl + 'images/placeHolderLogo.png' }}
                    size={"large"}
                    activeOpacity={0.7}
                    avatarStyle={{ width: 100 }}
                />
                <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <Rating
                        imageSize={15}
                        readonly
                        startingValue={restaurant.rating}
                    />
                    <Text style={{ color: 'grey' }}>{restaurant.description}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <DiscountBadges labels={restaurant.labels} />
                    </View>
                </View>
            </View>
        </Card>
        </View>
    );
}


class OrderScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            scrollY: new Animated.Value(0), 
            Order: [],
            Price: 0
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

    handleDish(item) {
        if (!this.state.Order.some(el => el.dishName === item.dishName)) {
            const orderObject = {
                dishName: item.dishName,
                quantity: 1,
                requests: ''
            }
            this.setState({Order: this.state.Order.concat([orderObject])});
            this.setState({Price: this.state.Price += item.price})
        }
        else {
            const dish = this.state.Order.find(el => el.dishName === item.dishName);
            dish.quantity++;
            this.setState({ Price: this.state.Price += item.price })
        }
    };

    handleSubtract(dish, price) {
        if (dish.quantity !== 1) {
            dish.quantity--;
            this.setState({ Price: this.state.Price - price });
        }
        else if (dish.quantity === 1) {
            this.setState({ Price: this.state.Price - price });
            const index = this.state.Order.findIndex(el => el.dishName === dish.dishName);
            delete this.state.Order.splice(index, 1);
        }
    };

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

        const SubtractButton = (props) => {
            const item = props.item;
            const dish = this.state.Order.find(el => el.dishName === item.dishName);
            if (dish != null) {
                return(
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Icon
                            type='font-awesome'
                            size={28}
                            color={'grey'}
                            name={'minus-circle'}
                            onPress={()=> this.handleSubtract(dish, item.price)}
                            />
                        <Text>{dish.quantity}</Text>
                    </View>
                );
            }
            else return(<View></View>);
        }

        const renderDishItem = ({item, index}) => {
            const subtitle =
                    <View style={{justifyContent: 'flex-start' }}>
                        <Text style={{ color: 'grey', fontSize: 12 }}>{item.dishDescription}</Text>
                    <View style={{ flexDirection: 'row', margin: 5}}>
                        <Text style={{ fontSize: 12 }}>月销:{item.salesPerMonth}</Text>
                        <Text style={{ fontSize: 12, marginLeft: 10 }}>赞:{item.likes}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                        <View style={{flexDirection: 'row'}}>
                        <Icon
                            name={'cny'}
                            type='font-awesome'
                            size={16}
                            color={'red'} />
                        <Text style={{ fontSize: 18, color: 'red' }}>{item.price}<Text style={{fontSize: 12, color: 'grey'}}>/个</Text></Text>
                        </View>
                        <SubtractButton item ={item} />
                        <Icon      
                            type='font-awesome'
                            size={28}
                            color={'blue'}
                            name={'plus-circle'}
                            onPress={() => this.handleDish(item)}
                            />
                    </View>
                    </View>
            return(
                <ListItem
                    key={index}
                    title={item.dishName}
                    titleStyle={{fontSize: 16}}
                    subtitleStyle={{fontSize: 14}}
                    containerStyle={{ alignItems: 'flex-start', justifyContent: "flex-start", height: 150}}
                    subtitle={subtitle}
                    leftAvatar={<Avatar
                        size={"large"}
                        source={{ uri: baseUrl + item.image }}
                        activeOpacity={0.7}
                        avatarStyle={{ width: 100 }}
                        containerStyle={{ margin: 7 }}
                    />}
                    bottomDivider={true}
                />  
            );
        }

        const renderSectionHeader = ({section: {category}}) => {
            return(
                <View style={{ backgroundColor: '#C9FBFF'}}>
                <Text style={{ fontWeight: 'bold' }}>{category}</Text>
                </View>
            );
        }

        const categoryMenu = categories.map((item, index) => {
            return(
                <ListItem
                    title={item.category}
                    titleStyle={{fontSize: 14}}
                    key={index}
                    style={{width: 80}}
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
            inputRange: [0, HEADER_SCROLL_DISTANCE/2,  HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.8, 0],
            extrapolate: 'clamp'
        });
        const contentTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp'
        });
        const titleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [-1, 1],
            extrapolate: 'clamp'
        });

        //DISPLAYED CONTENT
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
                <View style={styles.fill}>
                    <Animated.View style={[styles.header, {height: headerHeight, opacity: titleOpacity}]}>
                    <View style={styles.bar}>
                        <Text style={styles.title}>{restaurant.name}</Text>
                    </View>
                    </Animated.View>
                    <Animated.Image
                        style={[
                            styles.backgroundImage, { opacity: imageOpacity, transform: [{ translateY: contentTranslate }] }
                        ]}
                        source={{ uri: baseUrl + restaurant.image }}
                    />
                    <Animated.View style={{ top: 30, opacity: imageOpacity, transform: [{ translateY: contentTranslate }] }}>
                        <AboutRestaurantCard restaurant={restaurant} />
                    </Animated.View>
                    <Animated.View style={[styles.scrollViewContent, { transform: [{ translateY: contentTranslate}]} ]}>
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
                                    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
                            showsVerticalScrollIndicator={false}
                            style={{height: screenHeight-HEADER_MIN_HEIGHT}}
                        />
                    </Animated.View>
                    <View style={styles.checkoutBar}>
                        <Icon
                            name={'cutlery'}
                            type='font-awesome'
                            size={40}
                            color={'#359BFB'} />
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: 'white', fontSize: 25}}>总共：</Text>
                            <Text style={{ color: 'white', fontSize: 27 }}>{this.state.Price}</Text>
                            <Icon
                                name={'cny'}
                                type='font-awesome'
                                size={24}
                                color={'red'} />
                        </View>
                        <Button />
                    </View>
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
        flex: 0, 
        height: HEADER_MIN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center', 
        width: '100%'
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
        marginBottom: 10
    },
    scrollViewContent: {
        marginTop: HEADER_MIN_HEIGHT,
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
    },
    checkoutBar: {
        backgroundColor: 'black', 
        bottom: 20, 
        position: "absolute", 
        alignSelf: "center", 
        width: '90%', 
        height: 60,
        opacity: 0.87, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);