import Button from '@/components/button';
import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import { fetchLoginAction, fetchProFileAction, fetchRegisterAction } from '@/store/features/userSlice';
import { ValidatorMaxorMin, validateConfirmPassword } from '../validator';
import { message } from 'antd';
import { useEffect } from 'react';
const Regiteer = () => {
    const { token, isResiterStatus } = useSelector(state => state.user)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState()
    const dispathch = useDispatch()
    const [loginForm, setLoginForm] = useState({})
    const navigate = useNavigate()
    const onSubmit = () => {
        const payload = {
            username: watch('username'),
            password: watch('password')
        }
        setLoginForm(pre => ({ ...pre, ...payload }))
        dispathch(fetchRegisterAction(payload))
    }
    useEffect(() => {
        if (isResiterStatus) {
            console.log(loginForm)
            dispathch(fetchLoginAction(loginForm))
            navigate('/')
        }
    }, [isResiterStatus])
    const onToRegister = () => {
        navigate('/login')
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
                    Register
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
                    <input
                        className="dark:bg-zinc-800 text-[0.42rem] dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 focus:border-b-text-red-600 dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
                        name="confirmPassword" type="password" placeholder="ConfirmPassword" autoComplete="on"
                        {...register("confirmPassword", { required: 'confirmPassword is required', validate: () => validateConfirmPassword(watch('password'), watch('confirmPassword')) })}
                    />
                    {errors.confirmPassword && (<p className='text-red-600 text-[0.35rem] mt-0.5 text-left'>{errors.confirmPassword.message}</p>)}
                    <div className="pt-1 pb-3 leading-[0px] text-right">
                        <a className="inline-block p-1 text-[0.35rem] text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 duration-400 cursor-pointer"
                            onClick={onToRegister}>
                            go Login
                        </a>
                    </div>
                    <button className='w-full bg-[#f44c58] hover:bg-[#f32836] dark:bg-zinc-900  hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700   xl:dark:bg-zinc-800 rounded-[0.25rem] text-white text-[0.35rem] h-[40px]'>
                        Register Now
                    </button>
                </form>
            </div>
        </div >
    )
}

export default Regiteer