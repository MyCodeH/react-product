import { THEME_LIGHT } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';


const fullScreenSlice = createSlice({
    name: 'fullScreen',
    initialState: {
        imageUrl: '',
        isUpload: false
    },
    reducers: {
        changeFullScrrentImage: (state, { payload }) => {
            return { ...state, imageUrl: payload, isUpload: !state.isUpload }
        }
    },
});
export const { changeFullScrrentImage } = fullScreenSlice.actions
export default fullScreenSlice.reducer;