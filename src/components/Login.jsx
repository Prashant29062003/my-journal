import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm();
    const [error, setError] = useState("");

    const login = async(data)=> {
        setError("");
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <Logo width='100%'/>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign In</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don&apos;t have any account?&nbsp;
                <Link to={'/signup'}
                className='font-medium transition-all duration-200 hover:underline'>
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input 
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        error={errors.email?.message}
                        {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email address must be valid."
                            }
                        })}
                    />
                    <Input
                        label="Password: "
                        placeholder="Enter your password"
                        type="password"
                        error={errors.password?.message}
                        {...register("password", {
                            required: "Password is required."
                        })}
                    />
                    <Button className='w-full' type='submit' disabled={isSubmitting}>
                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
