import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    countriesList: {
      data: [],
      loading: false,
      error: {},
    },
    theme: 'light',
  },
  reducers: {
    setCountriesList(state, action) {
      state.countriesList = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const {setCountriesList, setTheme} = appSlice.actions;
export default appSlice.reducer;
