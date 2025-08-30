import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store, persistor} from './src/store';
import {theme} from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import EventsScreen from './src/screens/EventsScreen';
import AcademicsScreen from './src/screens/AcademicsScreen';
import CampusMapScreen from './src/screens/CampusMapScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoadingScreen from './src/components/LoadingScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;

                  switch (route.name) {
                    case 'Home':
                      iconName = 'home';
                      break;
                    case 'Events':
                      iconName = 'event';
                      break;
                    case 'Academics':
                      iconName = 'school';
                      break;
                    case 'Campus':
                      iconName = 'map';
                      break;
                    case 'Community':
                      iconName = 'people';
                      break;
                    case 'Profile':
                      iconName = 'person';
                      break;
                    default:
                      iconName = 'circle';
                  }

                  return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}>
              <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{title: 'ClassBuddy'}}
              />
              <Tab.Screen 
                name="Events" 
                component={EventsScreen}
                options={{title: 'Events'}}
              />
              <Tab.Screen 
                name="Academics" 
                component={AcademicsScreen}
                options={{title: 'Academics'}}
              />
              <Tab.Screen 
                name="Campus" 
                component={CampusMapScreen}
                options={{title: 'Campus Map'}}
              />
              <Tab.Screen 
                name="Community" 
                component={CommunityScreen}
                options={{title: 'Community'}}
              />
              <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{title: 'Profile'}}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
