import { loginUser, getProfile, registerUser } from '@/api/sys'
import md5 from 'md5'
import { message as Msg } from 'antd'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLoginAction = createAsyncThunk("fetch/loginAction", async (payload) => {
    const { password } = payload
    const res = await loginUser({ ...payload, password: md5(password), loginType: 'username' })
    return res
})
export const fetchRegisterAction = createAsyncThunk("fetch/registerAction", async (payload) => {
    const { password } = payload
    const res = await registerUser({ ...payload, password: md5(password) })
    return res
})

export const fetchProFileAction = createAsyncThunk('fetch/proFileAction', async (payload) => {
    const data = await getProfile()
    return data
})
const themeSlice = createSlice({
    name: 'user',
    initialState: {
        token: '',
        isResiterStatus: false,
        userInfo: {}
    },
    reducers: {
        logout: (state) => {
            state.token = ''
            state.userInfo = ''
            state.isResiterStatus = false
            location.reload()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLoginAction.fulfilled, (state, { payload }) => {
            Msg.success('Welcome to the website')
            state.token = payload.token
        })
        builder.addCase(fetchProFileAction.fulfilled, (state, { payload }) => {
            state.userInfo = payload
        })
        builder.addCase(fetchRegisterAction.fulfilled, (state, { payload }) => {
            state.isResiterStatus = true
        })
    }
});
export const { logout } = themeSlice.actions
export default themeSlice.reducer;