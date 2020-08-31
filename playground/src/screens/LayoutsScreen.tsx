import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Options, NavigationComponent } from 'react-native-navigation';

import Root from '../components/Root';
import Button from '../components/Button';
import testIDs from '../testIDs';
import Screens from './Screens';
import Navigation from '../services/Navigation';
import { stack } from '../commons/Layouts';

const {
  WELCOME_SCREEN_HEADER,
  STACK_BTN,
  BOTTOM_TABS_BTN,
  BOTTOM_TABS,
  SIDE_MENU_BTN,
  SPLIT_VIEW_BUTTON,
} = testIDs;

export default class LayoutsScreen extends NavigationComponent {
  static options(): Options {
    return {
      topBar: {
        testID: WELCOME_SCREEN_HEADER,
        title: {
          component: {
            waitForRender: true,
            name: Screens.LogoTopBar,
          },
        },
      },
      layout: {
        orientation: ['portrait', 'landscape'],
      },
    };
  }

  render() {
    return (
      <View>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../img/navigator.png')}
            resizeMode={'contain'}
            // @ts-ignore nativeID isn't included in react-native Image props.
            nativeID={`appLogo`}
            style={styles.logo}
            fadeDuration={0}
          />
        </View>
      </Root>
    );
  }

  stack = () => Navigation.showModal(Screens.Stack);

  bottomTabs = () =>
    Navigation.showModal({
      bottomTabs: {
        children: [
          stack(Screens.FirstBottomTabsScreen),
          stack(
            {
              component: {
                name: Screens.SecondBottomTabsScreen,
              },
            },
            'SecondTab'
          ),
        ],
        options: {
          bottomTabs: {
            testID: BOTTOM_TABS,
          },
        },
      },
    });

  sideMenu = () =>
    Navigation.showModal({
      sideMenu: {
        left: {
          component: {
            id: 'left',
            name: Screens.SideMenuLeft,
          },
        },
        center: stack({
          component: {
            id: 'SideMenuCenter',
            name: Screens.SideMenuCenter,
          },
        }),
        right: {
          component: {
            id: 'right',
            name: Screens.SideMenuRight,
          },
        },
      },
    });

  splitView = () => {
    Navigation.setRoot({
      root: {
        splitView: {
          id: 'SPLITVIEW_ID',
          master: {
            stack: {
              id: 'MASTER_ID',
              children: [
                {
                  component: {
                    name: Screens.CocktailsListMasterScreen,
                  },
                },
              ],
            },
          },
          detail: {
            stack: {
              id: 'DETAILS_ID',
              children: [
                {
                  component: {
                    id: 'DETAILS_COMPONENT_ID',
                    name: Screens.CocktailDetailsScreen,
                  },
                },
              ],
            },
          },
          options: {
            layout: {
              orientation: ['landscape'],
            },
            splitView: {
              displayMode: 'visible',
            },
          },
        },
      },
    });
  };

  onClickSearchBar = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.playground.SearchControllerScreen',
      },
    });
  };
}

const styles = StyleSheet.create({
  container: {},
  root: {
    flex: 1,
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    height: 200,
  },
});
