import SvgIcon from '@/components/icons-svg'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { changeSysTheme } from '@/store/features/themeSlice'
import { getActiveTheme } from '@/utils/theme'
import { useRef } from 'react'
const ButtonTheme = () => {
    const dispatch = useDispatch()
    const { themeType } = useSelector(state => state.sysTheme)

    const themeArr = [
        {
            id: '0',
            type: THEME_LIGHT,
            icon: 'theme-light',
            name: 'Light'
        },
        {
            id: '1',
            type: THEME_DARK,
            icon: 'theme-dark',
            name: 'Dark'
        },
        {
            id: '2',
            type: THEME_SYSTEM,
            icon: 'theme-system',
            name: 'Follow System'
        }
    ]
    const onItemClick = (item) => {
        dispatch(changeSysTheme({ ...item, type: item.id == '2' ? matchMedia.current?.matches ? 'dark' : 'light' : item.type }))
    }
    const matchMedia = useRef(null)
    useEffect(() => {
        toggleSysTheme()
    }, [themeType])
    const toggleSysTheme = () => {
        // html 的 class
        let themeClassName = ''
        switch (themeType.type) {
            case 'light':
                themeClassName = 'light'
                break
            case 'dark':
                themeClassName = 'dark'
                break
            case 'system':
                themeClassName = matchMedia.current?.matches ? 'dark' : 'light'
        }
        // 修改 html 的 class
        document.querySelector('html').className = themeClassName
    }

    useEffect(() => {
        matchMedia.current = window.matchMedia('(prefers-color-scheme: dark)')
        matchMedia.current.onchange = function () {
            dispatch(changeSysTheme({
                id: '2',
                type: matchMedia.current?.matches ? 'dark' : 'light',
                icon: 'theme-system',
                name: 'Follow System'
            }))

        }
    }, [])
    return (
        <div className="theme_btn w-4 h-4 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900 relative">
            <div className=" guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900">
                <SvgIcon name={themeType.icon || 'theme-light'}
                    size={20}
                    fillClass={themeType.type == 'dark' ? '#e4e4e7' : '#18181b'}
                />
            </div>
            {
                <div className=' absolute -left-[3.75rem] z-20 theme_btn-child'>
                    <div
                        className=' p-1 dark:bg-zinc-900 border rounded-md dark:border-zinc-700'
                    ><div className="w-[150px] overflow-hidden"
                    >
                            {
                                themeArr.map(item => (
                                    <div key={item.id} className="flex items-center  p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
                                        onClick={() => onItemClick(item)}
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
    )
}


export default ButtonTheme