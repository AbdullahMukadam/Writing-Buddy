import React from 'react'
import Input from './Input'
import { useForm } from 'react-hook-form'
import { authservice } from '../FireBase/Auth'
import { useDispatch } from 'react-redux'
import { login } from "../Store/AuthSlice"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonBtn from './CommonBtn'
import { FaGoogle } from "react-icons/fa";


function Login() {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = async (data) => {
        try {
            const LoginAccount = await authservice.SignIn(data)
            if (LoginAccount) {
                dispatch(login(LoginAccount))
                toast.success("welcome")
                 navigate("/home")
            } else {
                toast.error("Invalid Credentials")
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }

    }

    const handleGoogle = async () => {
        try {
            const createdAccount = await authservice.SignUpWithGoogle()
            if (createdAccount) {
                dispatch(login(createdAccount))
                toast.success("welcome")
                 navigate("/home")
            } else {
                toast.error("something went wrong")
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }

    }

    return (
        <div className='w-full h-full flex items-center justify-center md:justify-between'>
            <div className='w-[90%] md:w-[40%] md:ml-10 md:p-4 p-2 rounded-lg shadow-lg shadow-gray-300 bg-white h-[80%]'>
                <div className='w-full h-[10%] flex justify-center gap-2 mt-1 border-b-2 border-gray-300 p-2'>
                    <Link to="/signup" className='hover:bg-black hover:text-white text-black rounded-md transition-all transition-200 pl-1 pr-1'>SignUp</Link>
                    <span>/</span>
                    <Link to="/login" className='hover:bg-black hover:text-white text-black rounded-md transition-all transition-200 pl-1 pr-1'>Login</Link>
                </div>
                <form onSubmit={handleSubmit(submit)} className='w-full p-2 bg-white'>
                    <Input
                        label="Email"
                        placeholder="Enter your Email"
                        type="email"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                        })}
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your Password"
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <CommonBtn type='submit ' className='m-0 text-white'>Login</CommonBtn>
                </form>
                <p className='text-center mt-0'>or</p>
                <CommonBtn className='bg-white border-2 border-black text-black inline-block' onClick={handleGoogle}>Login With Google {<FaGoogle className='inline-block text-sm' />
                }</CommonBtn>
            </div>
            <div className='hidden md:block md:w-[50%] md:h-full md:float-right'>
                <img className='w-full h-full object-cover object-center' src="./signupLogo.webp" alt="" />
            </div>
        </div>
    )
}

export default Login