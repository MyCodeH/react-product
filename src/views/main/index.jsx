import React, { useEffect } from "react"
import SelectHeader from "./coms/header"
import WaterfallView from './coms/list'
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentCategory, fetchCategoryAction } from "@/store/features/categorySlice";
import { useRef, useState } from "react";
import useScrollPosition from '@/hooks/useScroll'
const HomeIndex = () => {
    const dispatch = useDispatch()
    const { currentCategory } = useSelector((state) => state.category)
    useEffect(() => {
        dispatch(fetchCategoryAction())
    }, [])
    const containerTarget = useRef(null)

    return <div ref={containerTarget} className="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
        <SelectHeader />
        <div className="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
            <WaterfallView containerTarget={containerTarget} />
        </div>
    </div>
}

export default HomeIndex