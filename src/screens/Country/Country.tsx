import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import styled from 'styled-components/native';
import {ICON_BACK} from '~/assets';
import {useCountry, useTheme} from '~/hooks';
import {CountryType, ThemeType} from '~/types';
import {PropsType} from './types';
import {ThemeProvider} from 'styled-components';
import {ThemeSwitch} from '~/components';

export const CountryPage = (props: PropsType) => {
  const {code} = props;
  const {getCountryData} = useCountry();

  const [loading, setLoading] = useState(true);
  const [currentCountry, setCurrentCountry] = useState<CountryType>();

  const {currentTheme} = useTheme();

  const fetchData = useCallback(async () => {
    const res = await getCountryData(code);
    setLoading(false);
    if (res.data) {
      setCurrentCountry(res.data);
    }
  }, [getCountryData, code]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const HeaderNode = useCallback(() => {
    if (!currentCountry) return null;
    return (
      <View>
        <Emoji>{currentCountry.emoji}</Emoji>
        <NameText>{currentCountry.name}</NameText>
      </View>
    );
  }, [currentCountry]);

  const DetailInfoNode = useCallback(() => {
    if (!currentCountry) return null;

    const onPress = () => {
      if (!currentCountry.continent) return;
      Navigation.push('ContinentPage', {
        component: {
          name: 'ContinentPage',
          passProps: {
            code: currentCountry.continent.code,
          },
          options: {
            topBar: {
              scrollEdgeAppearance: {
                active: false,
              },
              visible: true,
              animate: false,
              backButton: {
                visible: true,
                icon: ICON_BACK,
                showTitle: false,
              },
            },
          },
        },
      });
    };

    return (
      <View>
        <InfoBox>
          <TitleText>{'alpha2Code'}</TitleText>
          <ContentText>{currentCountry?.code}</ContentText>
        </InfoBox>
        <InfoBox>
          <TitleText>{'callingCodes'}</TitleText>
          <ContentText>{currentCountry.phone}</ContentText>
        </InfoBox>
        <InfoBox>
          <TitleText>{'continent'}</TitleText>
          <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <HighlighText>{currentCountry?.continent?.name}</HighlighText>
          </TouchableOpacity>
        </InfoBox>
      </View>
    );
  }, [currentCountry]);

  return (
    <ThemeProvider theme={currentTheme}>
      <SafeArea>
        {loading && <ActivityIndicator color="#000" />}
        {!currentCountry && !loading && <ErrorText>No data found</ErrorText>}
        {currentCountry && !loading && (
          <>
            {HeaderNode()}
            {DetailInfoNode()}
          </>
        )}
        <ThemeSwitch />
      </SafeArea>
    </ThemeProvider>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: ThemeType) => props.theme.background};
`;

const InfoBox = styled.View`
  flex-direction: row;
  margin-horizontal: 20px;
  justify-content: space-between;
  padding-vertical: 4px;
`;

const Emoji = styled.Text`
  font-size: 80px;
  text-align: center;
`;

const NameText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
  color: ${(props: ThemeType) => props.theme.text};
`;

const TitleText = styled.Text`
  color: ${(props: ThemeType) => props.theme.text};
`;

const ContentText = styled.Text`
  color: ${(props: ThemeType) => props.theme.text};
`;

const HighlighText = styled.Text`
  color: blue;
  text-decoration-line: underline;
`;

const ErrorText = styled.Text`
  color: ${(props: ThemeType) => props.theme.text};
  text-align: center;
`;
