import {ContinentType} from './Continent';

export type CountryType = {
  code?: string;
  name?: string;
  capital?: string;
  emoji?: string;
  phone?: string;
  continent?: ContinentType;
};

export type CountryDetailType = {
  data?: CountryType;
  error?: any;
};
