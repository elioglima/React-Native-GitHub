import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Welcome from './pages/Welcome';
import Repositories from './pages/Repositories';
import Organizations from './pages/Organizations';

const Routes = (userLogged = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Welcome,
        Repositories,
      },
      {
        initialRouteName: userLogged ? 'User' : 'Welcome',
      },
    ),
  );

export default Routes;
