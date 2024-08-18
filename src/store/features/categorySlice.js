import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategory } from '@/api/category';
import { CATEGORY_NOMAR_DATA, ALL_CATEGORY_ITEM } from '@/constants'


export const fetchCategoryAction = createAsyncThunk("fetch/categoryDate", async () => {
    const res = await getCategory()
    return { data: res.categorys }
})
const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categorys: CATEGORY_NOMAR_DATA, // 全部类别
        loading: false,
        currentCategory: ALL_CATEGORY_ITEM // 当前选中tag
    },
    reducers: {
        changeCurrentCategory: (state, { payload }) => {
            return { ...state, currentCategory: { ...state.currentCategory, ...payload } }
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategoryAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCategoryAction.fulfilled, (state, { payload }) => {
            state.loading = false
            state.categorys = [ALL_CATEGORY_ITEM, ...payload.data].map(item => {
                if (item.id == 'web_app_icon') {
                    return { ...item, urlname: "UI" }
                } else {
                    return { ...item, urlname: `${item.urlname.charAt(0).toUpperCase() + item.urlname.slice(1)}` }
                }
            })
        })
    }
});
export const { changeCurrentCategory } = categorySlice.actions
export default categorySlice.reducer;