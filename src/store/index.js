import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './features/categorySlice';
import sysThemeReducer from './features/themeSlice'
import { combineReducers } from "redux";
import { persistReducer, persistStore } from 'redux-persist';
import storageLocation from 'redux-persist/lib/storage'; //存储到localStorage
import userReducer from './features/userSlice'
import fullScrrentReducer from './features/fullScreenSlice'
import searchReducer from './features/searchSlice'

const persistConfig = {
    key: 'rootConf',
    storage: storageLocation,  //指定存储到Location中
    blacklist: ['search'] // 排除缓存key
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        //数据切片
        category: categoryReducer, // 类别状态管理
        sysTheme: sysThemeReducer, // 主题状态管理
        user: userReducer, // 用户数据管理
        search: searchReducer,
        fullScreen: fullScrrentReducer // 控制全屏管理
    })
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export const persistor = persistStore(store)