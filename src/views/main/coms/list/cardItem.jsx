import { useRef } from "react"
import { randomRGB } from '@/utils/color'
import Button from '@/components/button'
import { useDispatch, useSelector } from "react-redux"
import { changeFullScrrentImage } from "@/store/features/fullScreenSlice"
import { SourceTitle } from "@/constants"
import { getActiveTheme } from '@/utils/theme'
const CardItem = ({ item, width, onClickFn }) => {
    const dispatch = useDispatch()
    const imgTarget = useRef(null)
    const { themeType } = useSelector(state => state.sysTheme)
    const onToPinsClick = (row) => {
        onClickFn({ id: row.id })
    }
    const onShareClick = () => {

    }
    const onDownload = (data) => {
        const link = document.createElement('a')
        link.href = `${item.photo}?response-content-type=application/octet-stream`
        link.download = `${data.title} - 作者: ${data.author}.png`
        link.target = '_blank'
        link.click()
    }
    const onImgFullScreen = (url) => {
        dispatch(changeFullScrrentImage(url))
    }
    return (
        <div className="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">

            <div
                className="relative w-full rounded cursor-zoom-in group"
                style={{ backgroundColor: imgTarget.current?.src ? null : randomRGB() }}
                onClick={() => onToPinsClick(item)}
            >
                <img
                    // v-lazy
                    ref={imgTarget}
                    className="w-full rounded bg-transparent"
                    src={item.photo}
                    style={{
                        height: (width / item.photoWidth) * item.photoHeight + 'px'
                    }}
                />
                <div
                    className="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
                >
                    <div className="absolute top-1.5 left-1.5">
                        <Button onClick={onShareClick} size="default"
                        >Share</Button>

                    </div>
                    <div className="absolute top-1.5 right-1.5">

                        <Button
                            className="absolute top-1.5 right-1.5"
                            type="info"
                            icon="heart"
                            iconClass={themeType.type == 'dark' ? '#e4e4e7' : '#18181b'}
                        />
                    </div>
                    <div
                        className="absolute bottom-1.5 left-1.5 "
                    >
                        <Button
                            type="info"
                            size="small"
                            icon="download"
                            iconClass={themeType.type == 'dark' ? '#e4e4e7' : '#18181b'}
                            onHandleClick={() => onDownload(item)}
                        />
                    </div>
                    <div
                        className="absolute bottom-1.5 right-1.5 "
                    >
                        <Button
                            type="info"
                            size="small"
                            icon="full"
                            iconClass={themeType.type == 'dark' ? '#e4e4e7' : '#18181b'}
                            onHandleClick={() => onImgFullScreen(item.photo)}
                        />
                    </div>
                </div>


            </div>
            <p
                className="text-[0.35rem] mt-1 font-bold text-zinc-900 dark:text-zinc-300 line-clamp-2 px-1"
            >
                {SourceTitle}
            </p>
            <div className="flex items-center mt-1 px-1">
                <img
                    className="h-2 w-2 rounded-full" src={item.avatar} />
                <span className="text-[0.35rem]  text-zinc-500 ml-1">{item.author}</span>
            </div>
        </div>
    )
}

export default CardItem