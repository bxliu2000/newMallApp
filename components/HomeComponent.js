import React, {Component} from 'React';
import {ScrollView, Text, View, Dimensions} from 'react-native';
import { Button, Icon, Tile } from 'react-native-elements';
import { IMAGES } from '../shared/images/images';
import Carousel from './CarouselComponent';

var {height, width} = Dimensions.get('window');

// App Grid
function IconGrid(props) {
    const { navigate } = props.navigation;
    const IconCard = ({name, color, title, route}) => {
        return(
            <View style={{ justifyContent: 'center', alignItems: "center", margin: 5}}>
                <Icon
                    reverse
                    name={name}
                    type='font-awesome'
                    color={color}
                    size={30}
                    onPress={() => navigate(route)}
                />
                <Text style={{ fontSize: 15, paddingTop: 5 }}>{title}</Text>
            </View>
        );
    }

    return (
        <ScrollView 
            style={{marginLeft: 10, marginRight: 10}}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
        >
        <View style={{ flexDirection: 'row'}}>
            <IconCard name='shopping-bag' color='#474647' title='衣服'/>
            <IconCard name='shopping-cart' color='#97CC04' title='超市' />
            <IconCard name='film' color='#F50' title='电影' />
            <IconCard name='cutlery' color='#A01A7D' title='美食' route='Restaurant' />
            <IconCard name='coffee' color='#EF2917' title='下午茶' />
            <IconCard name='map-marker' color='#2660A4' title='地图' />
            <IconCard name='leaf' color='#498467' title='Drugs' />
            <IconCard name='microphone' color='#E6D74B' title='KTV' />
        </View>
        </ScrollView>
    );
}

//优惠 promotional tiles
function PromotionalTiles(props) {
    //Big promo tiles
    //small promo tiles

    //layout
    return (
        <View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Tile
                featured
                imageSrc={require('../shared/images/featuredTile1.png')}
                title='Test Title'
                titleStyle={{ backgroundColor: 'black', color: 'white' }}
                caption='Special Deal Dont miss out'
                captionStyle={{ backgroundColor: 'blue' }}
                width={width/2}
                
            />
            <Tile
                featured
                imageSrc={require('../shared/images/featuredTile2.png')}
                title='Test Title'
                titleStyle={{ backgroundColor: 'black' }}
                caption='Special Deal Dont miss out'
                captionStyle={{ backgroundColor: 'blue' }}
                width={width / 2}
            />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Tile
                featured
                imageSrc={require('../shared/images/featuredTile3.png')}
                width={width / 3}

            />
            <Tile
                featured
                imageSrc={require('../shared/images/featuredTile4.png')}
                title='Test Title'
                width={width / 3}
            />
            <Tile
                featured
                imageSrc={require('../shared/images/featuredTile5.png')}
                title='Test Title'
                width={width / 3}
            />
        </View>
        </View>
    );
}

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: IMAGES
        };
    }
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='home'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
            />
        )
    };
    
    render(){
        const { navigate } = this.props.navigation;
        return(
            <ScrollView>
                <Carousel images={this.state.images} />
                <IconGrid navigation={this.props.navigation}/>
                <PromotionalTiles />
            </ScrollView>
        );
    }
}

export default HomeScreen;