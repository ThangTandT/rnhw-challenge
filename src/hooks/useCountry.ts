import {useLazyQuery} from '@apollo/client';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {setCountriesList} from '~/states/app/reducer';
import {ContinentDetailType} from '~/types';
import {GET_COUNTRY_LIST, GET_COUNTRY_DATA, GET_CONTINENT_DATA} from './gql';

export const useCountry = () => {
  const [getCountries] = useLazyQuery(GET_COUNTRY_LIST, {
    fetchPolicy: 'cache-first',
  });
  const [getCountryDetail] = useLazyQuery(GET_COUNTRY_DATA, {
    fetchPolicy: 'cache-first',
  });
  const [getContinentDetail] = useLazyQuery(GET_CONTINENT_DATA, {
    fetchPolicy: 'cache-first',
  });
  const dispatch = useDispatch();

  const getCountriesList = useCallback(async () => {
    try {
      dispatch(setCountriesList({loading: true, data: []}));
      const res = await getCountries();
      if (res.data) {
        dispatch(setCountriesList({loading: false, data: res.data.countries}));
      } else {
        dispatch(setCountriesList({loading: false, data: []}));
      }
    } catch (err) {
      dispatch(setCountriesList({loading: false, data: [], error: err}));
    }
  }, [getCountries, dispatch]);

  const getCountryData = useCallback(
    async (code: string) => {
      try {
        const res = await getCountryDetail({
          variables: {code},
        });
        if (res.data) {
          return {
            data: res.data.country,
          };
        } else {
          return {
            data: undefined,
          };
        }
      } catch (err) {
        return {
          error: err,
        };
      }
    },
    [getCountryDetail],
  );

  const getContinentData = useCallback(
    async (code: string): Promise<ContinentDetailType> => {
      try {
        const res = await getContinentDetail({
          variables: {code},
        });
        if (res.data) {
          return {
            data: res.data.continent,
          };
        } else {
          return {
            data: undefined,
          };
        }
      } catch (err) {
        return {
          error: err,
        };
      }
    },
    [getContinentDetail],
  );

  return {
    getCountriesList,
    getCountryData,
    getContinentData,
  };
};
