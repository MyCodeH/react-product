import { Outlet } from 'react-router-dom'
import Haeder from './header/index'

const Layout = () => {
    return (
        <div className='w-full h-full'>
            <div>
                <Haeder />
            </div>
            <div className='h-main' style={{ height: 'calc(100vh - 72px)' }}>
                <Outlet />
            </div>
        </div>
    )
}


export default Layout