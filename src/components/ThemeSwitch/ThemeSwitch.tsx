import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {LIGHT_OFF, LIGHT_ON} from '~/assets';
import {setTheme} from '~/states/app/reducer';
import {AppStateType, ThemeType} from '~/types';

export const ThemeSwitch = () => {
  const theme = useSelector((state: AppStateType) => state.app.theme);
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  }, [theme, dispatch]);

  return (
    <Button onPress={onPress}>
      <Image
        source={theme === 'dark' ? LIGHT_ON : LIGHT_OFF}
        resizeMode="contain"
      />
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: ${(props: ThemeType) => props.theme.switchBackground};
  position: absolute;
  bottom: 10px;
  left: 10px;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
`;

const Image = styled.Image`
  width: ${(props: ThemeType) => props.theme.switchIconWidth}px;
`;
