import PurchaseHistoryScreen from './PurchaseHistoryComponent';
import ProfileScreen from './ProfileComponent';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import HomeScreen from "./HomeComponent";
import Restaurant from './ResturantComponent';
import PurchaseDetail from './PurchaseDetailComponent';
import OrderScreen from './OrderComponent';


const TabMainNavigator = createBottomTabNavigator({
    Home: {screen: HomeScreen},
    Purchases: {screen: PurchaseHistoryScreen},
    Profile: {screen: ProfileScreen}
},{
    tabBarOptions:{
        activeBackgroundColor: '#246EB9',
        inactiveBackgroundColor: '#00A7E1',
        activeTintColor: 'white',
        inactiveTintColor: 'white'
    },
    initialRouteName: 'Home'
})

//This shit sets the header to the tab dont touch 
TabMainNavigator.navigationOptions = ({navigation}) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let headerTitle = routeName;
    return {
        headerTitle,
    };
}

const SuperHomeNavigator = createStackNavigator({
    Tabs: {
        screen: TabMainNavigator, 
        navigationOptions: () => ({
            title: 'Home'
        })
    },
    Restaurant: { 
        screen: Restaurant,
        navigationOptions: () => ({
            tabBarVisible: false
        })
    },
    PurchaseDetail: {
        screen: PurchaseDetail,
        navigationOptions: () => ({
            tabBarVisible: false
        })
    },
    OrderScreen: {
        screen: OrderScreen,
        navigationOptions: () => ({
            tabBarVisible: false,
        })
    },
}, {
        initialRouteName: 'Tabs',
        navigationOptions: () => ({
            headerStyle: {
                backgroundColor: '#00A7E1'
            },
            headerTintColor: '#fff'
        })
    })

export default SuperHomeNavigator;