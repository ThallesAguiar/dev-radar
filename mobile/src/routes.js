import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

// Routes com R maiusculo, pq será um component
const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'MateshipRadar'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'User profile'
            }
        },
    }, {
        defaultNavigationOptions: { //será padrão em todo resto das telas.
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: 'teal'
            }
        }
    })
);

export default Routes;