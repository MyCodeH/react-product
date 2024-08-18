import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom/dist';
import { fetchLoginAction, fetchProFileAction } from '@/store/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ValidatorMaxorMin } from '../validator';
import { useEffect } from 'react';
import { Vertify } from '@alex_xu/react-slider-vertify';
import { Box, Modal } from '@mui/material';
import { IoClose } from "react-icons/io5";



const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loginForm, setLoginForm] = useState({ username: '', password: '' })
    const dispathch = useDispatch()
    const navigate = useNavigate()
    const { token, userInfo } = useSelector(state => state.user)
    const [visible, setVisible] = useState(true)
    const [isPass, setIsPass] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const onSubmit = () => {
        setIsOpen(true)
    }
    useEffect(() => {
        if (isPass) {
            dispathch(fetchLoginAction({ username: watch('username'), password: watch('password') }))
        }
    }, [isPass])

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    const onToRegister = () => {
        navigate('/register')
    }
    return (
        <div
            className="relative h-screen flex justify-center items-center bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
        >
            <div
                className="block px-3  dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl: xl:py-4 xl:rounded-sm xl:shadow-lg"
            >
                <h3
                    style={{ fontSize: '0.42rem' }}
                    className="mb-2 font-semibold text-base text-red-600 dark:text-zinc-300 hidden xl:block"
                >
                    Login
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="dark:bg-zinc-800 text-[0.42rem] dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 focus:border-b-text-red-600 dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
                        name="username" type="text" placeholder="Username" autoComplete="on"
                        {...register("username", { required: 'Username is required', validate: { maxLength: (value) => ValidatorMaxorMin('max', 12, value), minLength: (value) => ValidatorMaxorMin('min', 3, value) } })}
                    />

                    {errors.username && (<p className='text-red-600 text-[0.35rem] mt-0.5 text-left'>{errors.username.message}</p>)}
                    <input
                        className="dark:bg-zinc-800 text-[0.42rem] dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 focus:border-b-text-red-600 dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
                        name="password" type="password" placeholder="Password" autoComplete="on"
                        {...register("password", { required: 'Password is required', validate: { maxLength: (value) => ValidatorMaxorMin('max', 12, value), minLength: (value) => ValidatorMaxorMin('min', 6, value) } })}
                    />
                    {errors.password && (<p className='text-red-600 text-[0.35rem] mt-0.5 text-left'>{errors.password.message}</p>)}
                    <div className="pt-1 pb-3 leading-[0px] text-right">
                        <a className="inline-block p-1 text-[0.35rem] text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 duration-400 cursor-pointer"
                            onClick={onToRegister}>
                            go Register
                        </a>
                    </div>
                    <button className='w-full bg-[#f44c58] hover:bg-[#f32836] dark:bg-zinc-900  hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700   xl:dark:bg-zinc-800 rounded-[0.25rem] text-white text-[0.35rem] h-[40px]'>
                        Login
                    </button>
                </form>
            </div>
            <Modal
                keepMounted
                open={isOpen}
                onClose={() => { setIsOpen(false) }}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    outline: 'none',
                    bgcolor: '#fff',
                    p: 2,
                    borderRadius: '20px'
                }}>
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-between'>
                            <p className='text-[0.40rem] mb-2'>请完成安全测试</p>
                            <div className='relative -top-1 cursor-pointer' onClick={() => setIsOpen(false)}>
                                <IoClose size={28} />
                            </div>
                        </div>
                        <Vertify
                            width={320}
                            height={160}
                            visible={visible}
                            onSuccess={() => {
                                setVisible(true)
                                setIsPass(true)
                            }}    //成功触发事件
                        />
                    </div>
                </Box>
            </Modal>
        </div >
    )
}

export default Login