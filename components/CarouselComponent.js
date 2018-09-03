import React from 'react';
import { View, ScrollView, FlatList} from 'react-native';
import {Tile} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

function Carousel(props) {

    const images = props.images;

    if (images && images.length) {
        return (
            <View >
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    >
                <Tile
                    imageSrc={require('../shared/images/slideshow1.png')}
                    featured
                    height={135}
                    title='福州'
                    caption='Explore the Mall'
                    />
                <Tile
                    imageSrc={require('../shared/images/slideshow2.png')}
                    featured
                    height={135}
                    title='Movies'
                    caption='New Releases'
                    />
                <Tile
                    imageSrc={require('../shared/images/slideshow3.png')}
                    featured
                    height={135}
                    title='Family'
                    caption='Family Activities!'
                    />
                <Tile
                    imageSrc={require('../shared/images/slideshow4.png')}
                    featured
                    height={135}
                    title='Shop'
                    caption='Hundreds of New Shops!'
                    /> 
                </ScrollView>
            </View>
        );
    }
    else return (
        <View></View>
    );
}


export default Carousel;