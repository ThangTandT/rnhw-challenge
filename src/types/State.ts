import {CountryType} from './Country';

export type CountryStateType = {
  data: CountryType[];
  loading: boolean;
  error: any;
};

export type AppStateType = {
  app: {
    countriesList: CountryStateType;
    theme: string;
  };
};
