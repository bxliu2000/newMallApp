import React, { Component } from 'React';
import { ScrollView, Text, FlatList, View } from 'react-native';
import {ListItem, Avatar, Rating, Badge} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import { fetchRestaurants } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return{
        restaurants: state.restaurants
    }
}
const mapDispatchToProps = dispatch => ({
    fetchRestaurants: () => dispatch(fetchRestaurants())
})


function DiscountBadges(props) {
    const labels = props.labels;
    return(
        labels.map((item) => (
            <Badge
                key={item}
                value={item}
                containerStyle={{backgroundColor:'#FFF1F2', margin: 2, borderColor: 'red', borderWidth: 1}}
                textStyle={{fontSize: 10, color:'red'}}
                />
        ))
    );
}

class Restaurant extends Component {

    componentDidMount() {
        this.props.fetchRestaurants();
    }

    static navigationOptions = {
        title: 'Restaurants'
    }

    render() {
        const renderRestaurantItem = ({item, index}) => {
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    containerStyle={{alignItems: 'flex-start', justifyContent:"flex-start"}}
                    subtitle={
                        <View style={{alignItems:'flex-start', justifyContent:'flex-start'}}>
                            <Rating
                                imageSize={15}
                                readonly
                                startingValue={item.rating}
                            />
                            <Text style={{ color: 'grey' }}>{item.description}</Text>
                            <View style={{flexDirection:'row'}}>
                                <DiscountBadges labels={item.labels} />
                            </View>
                        </View>
                    }
                    leftAvatar={<Avatar 
                        size={"large"}
                        source={{uri: baseUrl + item.image}}
                        activeOpacity={0.7}
                        avatarStyle={{width: 100}}
                        containerStyle={{margin: 7}}
                    />}
                    bottomDivider={true}
                   
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

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);