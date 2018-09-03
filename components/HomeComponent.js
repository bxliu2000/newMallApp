import React, {Component} from 'React';
import {ScrollView, Text, View} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { IMAGES } from '../shared/images/images';
import Carousel from './CarouselComponent';

const IconGrid = () => {
    const IconCard = ({name, color, title}) => {
        return(
            <View style={{ justifyContent: 'center', alignItems: "center", margin: 6}}>
                <Icon
                    raised
                    reverse
                    name={name}
                    type='font-awesome'
                    color={color}
                    size={30}
                />
                <Text>{title}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{margin: 10}}>
        <View style={{justifyContent:'center', flexDirection: 'row'}}>
            <IconCard name='shopping-bag' color='#474647' title='衣服'/>
            <IconCard name='shopping-cart' color='#97CC04' title='超市' />
            <IconCard name='film' color='#F50' title='电影' />
            <IconCard name='cutlery' color='#A01A7D' title='美食' />
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row'}}>
            <IconCard name='birthday-cake' color='#EF2917' title='下午茶' />
            <IconCard name='venus' color='#2660A4' title='Prostitutes' />
            <IconCard name='leaf' color='#498467' title='Drugs' />
            <IconCard name='microphone' color='#E6D74B' title='KTV' />
        </View>
        </ScrollView>
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
                <IconGrid />
                <Text> This is the Home </Text>
                <Button 
                    title="Press me to goto restaurant"
                    onPress={()=> navigate('Restaurant')}
                    />
            </ScrollView>
        );
    }
}

export default HomeScreen;