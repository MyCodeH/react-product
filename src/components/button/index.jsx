import SvgIcon from "../icons-svg"

const Button = ({ icon, iconColor, btnClass, iconClass, type = 'main', size, isActiveAnim, loading, children, onHandleClick }) => {
    const typeEnum = {
        primary:
            'text-white  bg-zinc-800 dark:bg-zinc-900  hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
        main: 'text-white bg-main dark:bg-zinc-900  hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
        info: 'text-zinc-800 dark:text-zinc-300  bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700 '
    }
    // size 可选项：表示按钮大小。区分文字按钮和icon按钮
    const sizeEnum = {
        'icon-default': {
            button: 'w-8 h-4 text-[0.35rem]',
            icon: ''
        },
        // 'icon-default': {
        //     button: 'w-4 h-4',
        //     icon: 'w-1.5 h-1.5'
        // },
        small: {
            button: 'w-7 h-3 text-base',
            icon: ''
        },
        'icon-small': {
            button: 'w-3 h-3',
            icon: 'w-1.5 h-1.5'
        }
    }
    const onBtnClick = (e) => {
        e.stopPropagation()
        if (loading) {
            return
        }
        onHandleClick()
    }
    return (
        <button
            className={`text-center rounded duration-150 bg-[#f44c58] hover:bg-[#f32836] flex justify-center  items-center ${typeEnum[type]} ${sizeEnum[`icon-${size}`]?.button || 'w-4 h-4 '} ${btnClass}`}
            onClick={(e) => onBtnClick(e)}
        >
            {loading && <div className="w-2 h-2 animate-spin mr-1">
                <SvgIcon name="loading" />
            </div>}
            {
                icon && <div className="m-auto ">
                    <SvgIcon name={icon} fillClass={iconClass} />
                </div>
            }
            {
                !(icon && loading) && children
            }

        </button >
    )
}

export default Button