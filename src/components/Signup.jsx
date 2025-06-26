import { Link, Navigate, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {Button, Input, Logo} from "./index";
import { login } from "../store/authSlice";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm();

    const signup = async (data) => {
        setError("");
        try {
            const create = await authService.createAccount(data);
            if(create) {
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(login(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message || "Signup failed. Please try again.");
        }
    }
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
                <Logo width='100%'/>
          </div>
          <h2 className='text-center text-2xl font-bold leading-tight'>Sign Up</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Already have an account?&nbsp;
                <Link to={'/login'}
                className='font-medium transition-all duration-200 hover:underline'>
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(signup)} className="mt-8">
              <div className="space-y-8">
                <Input
                  label="Full Name:"
                  placeholder="Enter your full name"
                  error={errors.name?.message}
                  {...register("name", {
                    required: "Full name is required."
                  })}
                />
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
                  {isSubmitting ? 'Signing up...' : 'Sign up'}
                </Button>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
