import {gql} from '@apollo/client';

export const GET_COUNTRY_LIST = gql`
  query countries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      capital
      emoji
    }
  }
`;

export const GET_COUNTRY_DATA = gql`
  query country($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      phone
      continent {
        code
        name
      }
    }
  }
`;

export const GET_CONTINENT_DATA = gql`
  query continent($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
      }
    }
  }
`;
