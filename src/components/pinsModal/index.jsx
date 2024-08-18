import { useEffect } from "react"
import { getPexelsFromId } from '@/api/pexels'
import { useState } from "react"
import Button from "@/components/button"
import SvgIcon from "../icons-svg"
import OpenAI from 'openai';
import { SourceTitle } from "@/constants"
import TypingEffect from "../TypingEffect"
import { useSelector } from "react-redux"
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true
});
const PinsModal = ({ id, isVisiblePins }) => {
    const { themeType } = useSelector(state => state.sysTheme)

    const [detailInfo, setDetailInfo] = useState({})
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setText('')
        setDetailInfo({})
        fetchCardDetail()
    }, [id])

    const fetchCardDetail = async () => {
        const data = await getPexelsFromId(id)
        setDetailInfo({ ...data })
    }
    const callOpenAi = async (row) => {
        setLoading(true)
        let url = `${row.photo}.${row.photoType}`
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Recommand this wallpaper to me in 50 words?" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": url,
                            },
                        },
                    ],
                },
            ],
        })
        const data = await response.choices[0]
        const t = await data.message.content
        setLoading(false)
        setText(t)
        return response;
    }

    return <div className="w-full h-full flex">
        <img
            className="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
            src={detailInfo.photo}
        ></img>
        <div className="relative flex-1 xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3">
            <div className="flex justify-between mb-2">

                <div
                    className="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
                >
                    <SvgIcon size={18} name="share" iconClass="fill-zinc-900 dark:fill-zinc-200" />
                </div>
                <Button
                    className="absolute top-1.5 right-1.5"
                    type="info"
                    icon="heart"
                    iconClass={themeType.type == 'dark' ? '#e4e4e7' : '#18181b'}
                />
            </div>
            <p
                className="text-[0.65rem] text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl: xl:mb-5"
            >
                {SourceTitle}
            </p>
            <div className="flex items-center mt-1 px-1">
                <img
                    className="h-3 w-3 rounded-full"
                    src={detailInfo.avatar}
                    alt=""
                />
                <span className="text-[0.42rem] text-zinc-900 dark:text-zinc-200 ml-1">{
                    detailInfo.author
                }</span>
            </div>
            <div className="mt-1 text-[0.42rem] text-zinc-900 dark:text-zinc-200 ml-1">
                {loading ? 'loading...' : <TypingEffect text={text} delay={50} />}
            </div>
            <div className="absolute bottom-1.5 right-1.5">
                <Button onHandleClick={() => callOpenAi(detailInfo)} size="default"
                >ask GPT</Button>
            </div>
        </div>
    </div>
}

export default PinsModal