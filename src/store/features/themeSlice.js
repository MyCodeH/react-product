import { THEME_LIGHT } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';


const themeSlice = createSlice({
    name: 'sysTheme',
    initialState: {
        themeType: THEME_LIGHT
    },
    reducers: {
        changeSysTheme: (state, { payload }) => {
            return { ...state, themeType: { ...payload } }
        }
    },
});
export const { changeSysTheme } = themeSlice.actions
export default themeSlice.reducer;