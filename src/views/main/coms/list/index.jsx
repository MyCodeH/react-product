import WaterfallWrap from "@/components/waterfallWrap"
import { getPexelsList } from '@/api/pexels'
import { useState, useRef, useEffect, useMemo } from "react"
import { shallowEqual, useSelector } from "react-redux"
import {
    getImgElements,
    getAllImg,
    onComplateImgs,
    getMinHeightColumn,
    getMinHeight,
    getMaxHeight
} from '@/utils/waterfall'
import CardItem from "./cardItem"
import PinsModal from '@/components/pinsModal'
import { Modal } from "antd"
const WaterfallView = ({ containerTarget }) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const { currentCategory, } = useSelector((state) => state.category)
    const { searchText: searchContent } = useSelector((state) => state.search)
    const [query, setQuery] = useState({
        page: 1,
        size: 20,
        categoryId: '',
        searchText: ''
    })

    useEffect(() => {
        containerTarget.current.scrollTop = 0
        setQuery({ ...query, page: 1, size: 20, categoryId: currentCategory.id, searchText: searchContent })
        fetchList({ ...query, page: 1, size: 20, categoryId: currentCategory.id, searchText: searchContent })
    }, [currentCategory.id, searchContent])

    const [isVisiblePins, setIsVisiblePins] = useState(false)
    const [curCardItem, setCurCardItem] = useState({})
    const currentCardItemData = (data) => {
        setIsVisiblePins(true)
        setCurCardItem(pre => ({ ...pre, ...data }))
    }
    async function fetchList(query) {
        if (isFinished) {
            return
        }
        if (list.length) {
            setQuery(pre => ({ ...pre, categoryId: query.categoryId }))
        }
        const res = await getPexelsList(query)

        if (query.page == 1) {
            setList(res.list)
        } else {
            const newList = [...list, ...res.list]
            setList(newList)
        }
        if (list.length == res.total) {
            setIsFinished(true)
        }
        setLoading(false)
    }
    const handleDownLoad = (page) => {
        setLoading(true);
        setQuery({ ...query, page });
        fetchList(query)
    }
    return <>
        <WaterfallWrap loading={loading} isFinished={isFinished} query={query} onLoad={({ page }) => handleDownLoad(page)}>
            <WaterfallList data={list} picturePreReading={false} className="w-full px-1" onCollectDataFn={currentCardItemData}>
            </WaterfallList>
        </WaterfallWrap>
        {/* modal弹窗 */}
        <Modal open={isVisiblePins} footer={null} width={'80%'} onCancel={() => setIsVisiblePins(false)}>
            {isVisiblePins && <PinsModal id={curCardItem.id}></PinsModal>}
        </Modal >
    </>
}

const WaterfallList = ({ data, column = 5, columnSpacing = 20, rowSpacing = 20, picturePreReading, onCollectDataFn }) => {
    const containerTarget = useRef(null) // 容器实例
    const [containerHeight, setContainerHeight] = useState(0)
    const [columnHeightObj, setColumnHeightObj] = useState({})
    const useColumnHeightObj = () => {
        setColumnHeightObj({})
        for (let i = 0; i < column; i++) {
            columnHeightObj[i] = 0;
        }
        setColumnHeightObj(columnHeightObj)
    }

    useEffect(() => {
        useColumnHeightObj()
    }, [])

    // 容器总宽度 容器左边距
    // 记录每列高度的容器。key：所在列  val：列高
    const [containerWidth, setContainerWidth] = useState(0)
    const [containerLeft, setContainerLeft] = useState(0)

    const useContainerWidth = () => {
        if (containerTarget.current) {
            const { paddingLeft, paddingRight } = getComputedStyle(
                containerTarget.current,
                null
            )
            setContainerLeft(parseFloat(paddingLeft))
            setContainerWidth(containerTarget.current.clientWidth - parseFloat(paddingLeft) -
                parseFloat(paddingRight))
        }
    }
    const [columnWidth, setColumnWidth] = useState(0) // 列宽
    const columnSpacingTotal = useMemo(() => {
        return (column - 1) * columnSpacing
    }, [column, columnSpacing])

    const useColumnWidth = () => {
        // 获取容器宽度
        useContainerWidth()
        // 计算列宽
        setColumnWidth((containerWidth - columnSpacingTotal) / column)
    }
    useEffect(() => {
        useColumnWidth()
    }, [containerWidth])

    // -----------------------------------------------------------------------------------------------------

    // item 高度集合
    let itemHeights = []

    /**
 * 监听图片加载完成
 */
    const waitImgComplate = () => {
        itemHeights = []
        // 拿到所有元素
        let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
        // 获取所有元素的 img 标签
        const imgElements = getImgElements(itemElements)
        // 获取所有 img 标签的图片
        const allImgs = getAllImg(imgElements)
        onComplateImgs(allImgs).then(() => {
            // 图片加载完成，获取高度
            itemElements.forEach((el) => {
                itemHeights.push(el.offsetHeight)
            })
            // 渲染位置
            useItemLocation()
        })
    }
    /**
     * 图片不需要预加载时，计算 item 高度
     */
    const useItemHeight = () => {
        itemHeights = []
        // 拿到所有元素
        let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
        // 计算 item 高度
        itemElements.forEach((el) => {
            // 依据传入数据计算出的 img 高度
            itemHeights.push(el.offsetHeight)
        })
        // 渲染位置
        useItemLocation()
    }

    /**
 * 为每个 item 生成位置属性
 */
    const useItemLocation = () => {
        // 遍历数据源
        data.forEach((item, index) => {
            // 避免重复计算
            if (item._style) {
                return
            }
            // 生成 _style 属性
            item._style = {}
            // left
            item._style.left = getItemLeft()
            // top
            item._style.top = getItemTop()
            // 指定列高度自增
            increasingHeight(index)
        })
        // 指定容器高度
        setContainerHeight(getMaxHeight(columnHeightObj))
    }

    /**
 * 返回下一个 item 的 left
 */
    const getItemLeft = () => {
        // 最小高度所在的列 * (列宽 + 间距)
        const column = getMinHeightColumn(columnHeightObj)
        return (
            column * (columnWidth + columnSpacing) + containerLeft
        )
    }

    /**
 * 返回下一个 item 的 top
 */
    const getItemTop = () => {
        // 列高对象中的最小的高度
        return getMinHeight(columnHeightObj)
    }

    /**
 * 指定列高度自增
 */
    const increasingHeight = (index) => {
        // 最小高度所在的列
        const minHeightColumn = getMinHeightColumn(columnHeightObj)
        // 该列高度自增
        columnHeightObj[minHeightColumn] +=
            itemHeights[index] + rowSpacing
        setColumnHeightObj(columnHeightObj)
    }

    useEffect(() => {
        if (data.length) {
            const resetColumnHeight = data.every((item) => !item._style)
            if (resetColumnHeight) {
                // 构建高度记录容器
                useColumnHeightObj()
            }
            if (picturePreReading) {
                waitImgComplate()
            } else {
                useItemHeight()
            }
        }
    }, [data])

    const handleCardClick = (data) => {
        onCollectDataFn(data)
    }
    return (
        <div className="relative w-full px-1" ref={containerTarget} style={{ height: containerHeight + 'px' }} >
            {
                data.length > 0 && data.map((card, i) => (
                    <div key={i} className="m-waterfall-item absolute duration-300" style={{ width: columnWidth + 'px', left: card._style?.left + 'px', top: card._style?.top + 'px' }}>
                        <CardItem item={card} width={columnWidth} onClickFn={(data) => handleCardClick(data)} />
                    </div>
                ))
            }

        </div>
    )
}

export default WaterfallView