import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';
import TrailerPlayer from '../screens/TrailerScreen';
import SearchMovie from '../screens/SearchMovie';

const Stack = createStackNavigator();

const MainStack = () => {
  const customOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={customOptions} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={customOptions}
      />
      <Stack.Screen
        name="TrailerPlayer"
        component={TrailerPlayer}
        options={{ presentation: 'modal', ...customOptions }}
      />
      <Stack.Screen
        name="SearchMovie"
        component={SearchMovie}
        options={customOptions}
      />
    </Stack.Navigator>
  );
};

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
