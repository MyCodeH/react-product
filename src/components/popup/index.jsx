function Popup() {
    return (
        <div class="">
            <teleport to="body">
                <transition name="fade">
                    <div
                        v-if="isOpen"
                        className="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
                        onClick="isOpen = false"
                    ></div>
                </transition>
                <transition name="popup-down-up">
                    <div
                        v-if="isOpen"
                        v-bind="$attrs"
                        className="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
                    >
                        <slot />
                    </div>
                </transition>
            </teleport>
        </div >
    )
}

export default Popup