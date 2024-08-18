import { createBrowserRouter } from "react-router-dom";
import Layout from "@/views/layout";
import Login from "@/views/login-register/login";
import Register from "@/views/login-register/register";
import MainIndex from '@/views/main'
const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                name: 'home',
                element: <MainIndex />
            }

        ]
    },
    {
        path: '/login',
        name: 'login',
        element: <Login />
    },
    {
        path: '/register',
        name: 'register',
        element: <Register />
    }
]

const routerConfig = {
    basename: '/'
}

const router = createBrowserRouter(routes, routerConfig)

export default router