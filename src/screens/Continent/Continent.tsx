import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import styled from 'styled-components/native';
import {ThemeProvider} from 'styled-components';
import {ICON_BACK} from '~/assets';
import {useCountry, useTheme} from '~/hooks';
import {ContinentType, ThemeType} from '~/types';
import {PropsType} from './types';
import {ThemeSwitch} from '~/components';

export const ContinentPage = (props: PropsType) => {
  const {code} = props;
  const {getContinentData} = useCountry();

  const {currentTheme} = useTheme();
  const [loading, setLoading] = useState(true);
  const [currentContinent, setCurrentContinent] = useState<ContinentType>();

  const fetchData = useCallback(async () => {
    const res = await getContinentData(code);
    setLoading(false);
    if (res.data) {
      setCurrentContinent(res.data);
    }
  }, [getContinentData, code]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    getContinentData(code);
  }, [getContinentData, code]);

  const DetailInfoNode = useCallback(() => {
    if (!currentContinent) return null;

    return (
      <FlexBox>
        <NameText>{currentContinent.name}</NameText>
        <InfoBox>
          <TitleText>{'code'}</TitleText>
          <ContentText>{currentContinent.code}</ContentText>
        </InfoBox>
        <FlexInfoBox>
          <TitleText>{'countries'}</TitleText>
          <ScrollView showsVerticalScrollIndicator={false}>
            {currentContinent.countries &&
              currentContinent.countries.map(item => {
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
                  <TouchableOpacity
                    onPress={onPress}
                    key={item.code}
                    activeOpacity={0.8}>
                    <HighlighText>{item.name}</HighlighText>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </FlexInfoBox>
      </FlexBox>
    );
  }, [currentContinent]);

  if (loading) {
    return (
      <ThemeProvider theme={currentTheme}>
        <SafeArea>
          <ActivityIndicator color="#000" />
        </SafeArea>
      </ThemeProvider>
    );
  }

  if (!currentContinent) {
    return (
      <ThemeProvider theme={currentTheme}>
        <SafeArea>
          <ErrorText>No data found</ErrorText>
        </SafeArea>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <SafeArea>
        {loading && <ActivityIndicator color="#000" />}
        {!currentContinent && !loading && <ErrorText>No data found</ErrorText>}
        {currentContinent && !loading && DetailInfoNode()}
        <ThemeSwitch />
      </SafeArea>
    </ThemeProvider>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: ThemeType) => props.theme.background};
`;

const FlexBox = styled.View`
  flex: 1;
`;

const NameText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
  color: ${(props: ThemeType) => props.theme.text};
`;

const InfoBox = styled.View`
  flex-direction: row;
  margin-horizontal: 20px;
  justify-content: space-between;
  padding-vertical: 4px;
`;

const FlexInfoBox = styled.View`
  flex: 1;
  flex-direction: row;
  margin-horizontal: 20px;
  justify-content: space-between;
  padding-vertical: 4px;
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
  text-align: right;
  margin-bottom: 2px;
`;

const ErrorText = styled.Text`
  color: ${(props: ThemeType) => props.theme.text};
  text-align: center;
`;
