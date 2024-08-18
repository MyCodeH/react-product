import { createSlice } from '@reduxjs/toolkit';


const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchText: '',
    },
    reducers: {
        setSearchTextFn: (state, { payload }) => {
            return {
                ...state,
                searchText: payload
            }
        }
    },
});
export const { setSearchTextFn } = searchSlice.actions
export default searchSlice.reducer;