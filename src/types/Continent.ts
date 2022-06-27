import {CountryType} from './Country';

export type ContinentType = {
  code?: string;
  name?: string;
  countries?: CountryType[];
};

export type ContinentDetailType = {
  data?: ContinentType;
  error?: any;
};
