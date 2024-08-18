import SvgIcon from "@/components/icons-svg"
import { useRef, useState, useEffect } from "react"
import { useIntersectionObserver } from "@reactuses/core"
const WaterfallWrap = ({ loading, isFinished, query, onLoad, children }) => {
    const laodingTarget = useRef(null)
    const [entry, setEntry] = useState([]);
    const [isLoad, setIsLoad] = useState(false)
    useIntersectionObserver(
        laodingTarget,
        (entry) => {
            setEntry(entry);
        },
        {
            root: null,
            rootMargin: "",
            threshold: 1,
        }
    );

    useEffect(() => {
        emitLoad()
    }, [entry[0]])

    const emitLoad = () => {
        if (entry[0] && !loading && !isFinished) {
            setIsLoad(!isLoad)
        }
    }
    useEffect(() => {
        if (isLoad) {
            if (entry[0]?.boundingClientRect?.top > 200) {
                onLoad({ page: (query.page += 1) })
            }
        }
    }, [isLoad])
    return (
        <div>
            {children}
            {/* {entry} */}
            <div ref={laodingTarget} className="h-6 py-4">
                {
                    loading && <div className="w-4 h-4 mx-auto animate-spin">
                        <SvgIcon name="infinite-load" size={40} />
                    </div>
                }
                {
                    isFinished && <p className="text-center text-[0.42rem] text-zinc-400">
                        There is no more data available!
                    </p>
                }

            </div>
        </div>
    )
}

export default WaterfallWrap