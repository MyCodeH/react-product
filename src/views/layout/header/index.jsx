import { useNavigate } from "react-router-dom"
import ButtonTheme from './button-theme/button-theme'
import SvgIcon from '@/components/icons-svg'
import Button from "@/components/button"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from '@/store/features/userSlice'
import Avatar from '@/assets/images/avatar.jpg'
import { useForm } from "react-hook-form"
import { setSearchTextFn } from "@/store/features/searchSlice"
const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { themeType } = useSelector(state => state.sysTheme)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // 点击返回首页
    const { token } = useSelector(state => state.user)
    const handleToHome = () => {
        navigate('/')
    }
    const goLogin = () => {
        if (!token) {
            navigate('/login')
        }
    }
    const themeArr = [
        {
            id: '0',
            icon: 'logout',
            name: '退出登录'
        },
    ]
    const handleLogout = () => {
        dispatch(logout())
    }
    const onSearchHandlder = (Event) => {
        if (Event.key == 'Enter') {
            let searchText = watch('searchText')
            dispatch(setSearchTextFn(searchText))
        }
    }
    return (
        <div className="w-full duration-500 bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 h-header">
            <div className="flex items-center">
                <img
                    className="h-4 cursor-pointer mr-2 guide-home rounded-sm"
                    src={Avatar}
                    onClick={handleToHome}
                />
                <div className="w-full guide-search mr-1">
                    <div className="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40">
                        <div>
                            <div className="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2">
                                <SvgIcon name="search" color="#707070" size={15} />
                            </div>
                            <input style={{ fontSize: '0.35rem' }}  {...register("searchText")} onKeyDown={onSearchHandlder} className="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300 " placeholder="Search" />
                            <div
                                className="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100">
                            </div>
                            <div className="absolute  translate-y-[-50%] top-[50%] right-1 rounded-xl duration-500 opacity-0 group-hover:opacity-100">
                                <Button icon="search" btnClass="rounded-xl"
                                    iconClass="#fff"
                                ></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mr-1">
                    <ButtonTheme className="mr-1" />
                </div>
                <div className="guide-my relative group1" >
                    <Button icon="profile"
                        iconClass={themeType.type == 'dark' ? '#e4e4e7' : '#fff'}
                        onHandleClick={goLogin} />
                    {
                        (token) && <div className='absolute -left-[3.75rem]  z-20 group1-child'>
                            <div
                                className=' p-1 dark:bg-zinc-900 border rounded-md dark:border-zinc-700'
                            ><div className="w-[140px] overflow-hidden"
                            >
                                    {
                                        themeArr.map(item => (
                                            <div key={item.id} className="flex items-center  p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
                                                onClick={handleLogout}
                                            >
                                                <div className='w-1.5 h-1.5 mr-1'>
                                                    <SvgIcon name={item.icon || themeArr[0].type} fillClass={themeType.type == 'dark' ? '#e4e4e7' : '#18181b'} />
                                                </div>
                                                <span className="text-zinc-800 dark:text-zinc-300 text-[0.35rem]">{
                                                    item.name
                                                }</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Header