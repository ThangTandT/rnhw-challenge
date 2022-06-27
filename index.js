/**
 * @format
 */

import React from 'react';
import {Navigation} from 'react-native-navigation';
import {HomePage, CountryPage, ContinentPage} from '~/screens';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import {Provider} from 'react-redux';
import {store} from '~/states';

const httpLink = new HttpLink({
  uri: 'https://countries.trevorblades.com/',
  fetch: fetch,
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const ProviderWrap = Comp => props => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Comp {...props} />
      </Provider>
    </ApolloProvider>
  );
};
Navigation.setDefaultOptions({
  topBar: {
    visible: false,
  },
});

Navigation.registerComponent('HomeScreen', () => ProviderWrap(HomePage));
Navigation.registerComponent('CountryPage', () => ProviderWrap(CountryPage));
Navigation.registerComponent('ContinentPage', () =>
  ProviderWrap(ContinentPage),
);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: 'CountryPage',
              name: 'CountryPage',
            },
          },
          {
            component: {
              id: 'ContinentPage',
              name: 'ContinentPage',
            },
          },
          {
            component: {
              id: 'HomeScreen',
              name: 'HomeScreen',
            },
          },
        ],
      },
    },
  });
});
