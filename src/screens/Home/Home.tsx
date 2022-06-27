import React, {useCallback, useEffect} from 'react';
import {FlatList, Linking, RefreshControl, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {ICON_BACK} from '~/assets';
import {ThemeSwitch} from '~/components';
import {COUNTRY_ITEM_HEIGHT} from '~/constants';
import {useCountry, useTheme} from '~/hooks';
import {AppStateType, CountryType, CountryStateType, ThemeType} from '~/types';
import {ThemeProvider} from 'styled-components';

export const HomePage = () => {
  const {getCountriesList} = useCountry();
  const countries: CountryStateType = useSelector(
    (state: AppStateType) => state.app.countriesList,
  );

  const {currentTheme} = useTheme();

  useEffect(() => {
    Linking.getInitialURL().then(url => onDeepLinkCallback({url}));
    Linking.addEventListener('url', onDeepLinkCallback);
    return () => {
      Linking.removeEventListener('url', onDeepLinkCallback);
    };
  }, []);

  const onDeepLinkCallback = ({url}: {url: string | null}) => {
    console.log(
      '🚀 ~ file: Home.tsx ~ line 30 ~ onDeepLinkCallback ~ url',
      url,
    );
    try {
      if (!url) return;
      if (url.includes('rnhw://country')) {
        const code = url.split('rnhw://country/')[1];
        if (code) {
          Navigation.push('CountryPage', {
            component: {
              name: 'CountryPage',
              passProps: {
                code: code,
              },
              options: {
                topBar: {
                  visible: true,
                  animate: false,
                  backButton: {
                    visible: true,
                    icon: ICON_BACK,
                  },
                },
              },
            },
          });
        }
      } else if (url.includes('rnhw://continent')) {
        const code = url.split('rnhw://continent/')[1];
        if (code) {
          Navigation.push('ContinentPage', {
            component: {
              name: 'ContinentPage',
              passProps: {
                code: code,
              },
              options: {
                topBar: {
                  visible: true,
                  animate: false,
                  backButton: {
                    visible: true,
                    icon: ICON_BACK,
                  },
                },
              },
            },
          });
        }
      }
    } catch (err) {}
  };

  useEffect(() => {
    Navigation.setDefaultOptions({
      topBar: {
        background: {
          color: currentTheme.background,
        },
      },
    });
  }, [currentTheme]);

  useEffect(() => {
    getCountriesList();
  }, [getCountriesList]);

  const renderItem = useCallback(({item}: {item: CountryType}) => {
    const onPress = () => {
      Navigation.push('CountryPage', {
        component: {
          name: 'CountryPage',
          passProps: {
            code: item.code,
          },
          options: {
            topBar: {
              visible: true,
              animate: false,
              backButton: {
                visible: true,
                icon: ICON_BACK,
              },
            },
          },
        },
      });
    };

    return (
      <ItemBox activeOpacity={0.8} onPress={onPress}>
        <Emoji>{item.emoji}</Emoji>
        <NameBox>
          <NameText numberOfLines={1}>{item.name}</NameText>
          <CapitalText numberOfLines={1}>{item.capital}</CapitalText>
        </NameBox>
      </ItemBox>
    );
  }, []);

  const ListHeaderNode = useCallback(() => {
    return (
      <View>
        <HeaderBox />
        <Title>List of countries</Title>
      </View>
    );
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <Container>
        <FlatList
          data={countries.data}
          refreshControl={
            <RefreshControl
              refreshing={countries.loading}
              onRefresh={getCountriesList}
            />
          }
          ListHeaderComponent={ListHeaderNode}
          keyExtractor={item => item.name || ''}
          renderItem={renderItem}
          getItemLayout={(data, index) => ({
            length: COUNTRY_ITEM_HEIGHT,
            offset: COUNTRY_ITEM_HEIGHT * index,
            index,
          })}
          initialNumToRender={15}
          removeClippedSubviews
        />
        <ThemeSwitch />
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeType) => props.theme.background};
`;

const Title = styled.Text`
  font-weight: bold;
  margin: 20px;
  font-size: 16px;
  color: ${(props: ThemeType) => props.theme.text};
`;

const HeaderBox = styled.View`
  background-color: #ffc0cb;
  height: 200px;
  border-bottom-left-radius: 20px;
`;

const ItemBox = styled.TouchableOpacity`
  margin-horizontal: 20px;
  margin-bottom: 16px;
  padding-horizontal: 4px;
  height: ${COUNTRY_ITEM_HEIGHT}px;
  flex-direction: row;
  align-items: center;
  shadow-color: ${(props: ThemeType) => props.theme.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  background-color: ${(props: ThemeType) => props.theme.background};
`;

const Emoji = styled.Text`
  font-size: 50px;
`;

const NameBox = styled.View`
  margin-left: 8px;
`;

const NameText = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: ${(props: ThemeType) => props.theme.text};
`;

const CapitalText = styled.Text`
  font-weight: 300;
  color: ${(props: ThemeType) => props.theme.text};
`;
