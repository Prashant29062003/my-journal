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
    const [error, setError] = useState();
    const {register, handleSubmit} = useForm();

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
        setError(error)
      }
    }
  return (
    <div>
      <div className="lex items-center justify-center w-full">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
                <Logo width='100%'/>
          </div>
          <h2 className='text-center text-2xl fornt-bold leading-tight'></h2>
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
                {...register("name", {
                  required: true
                })}
                />
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                      matchPattern: (value) => /^\w+([.-]?\w+)*([.-]?\w{2,3})+$/.test(value) || "Email address must be valid address."
                      }
                })}
                />
                <Input
                        label="Password: "
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", {
                            required: true
                        })}

                    />
                <Button className='w-full'type='submit' >Sign up</Button>
              </div>
            </form>
        </div>

      </div>
    </div>
  )
}

export default Signup
