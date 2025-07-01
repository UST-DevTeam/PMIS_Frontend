import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import AuthActions from '../store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WithSideImage from '../components/WithSideImage';
import { FaEyeSlash } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
 
const Login = () => {

    //password visible functioality
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const toggleEye = () => {
        setShowPassword(!showPassword)
    }


    const dispatch = useDispatch()
    const navigate = useNavigate()


    let checkauth;


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        dispatch(AuthActions.signIn(data, () => {
            navigate('/')
        }))
    }

    useEffect(() => {
        checkauth = localStorage.getItem("auth")

        if (checkauth == "true") {
            navigate('/')
        }
    }, [checkauth])

    useEffect(() => {
        const handleEnterKey = (e) => {
          if (e.key === "Enter") {
            handleSubmit(onSubmit)();
          }
        };
        
        document.addEventListener("keypress", handleEnterKey);
        return () => {
          document.removeEventListener("keypress", handleEnterKey);
        };
    }, []);



    //     <>
    //     <div className='flex md:w-1/2 bg-sideimage' >

    //     </div>
    //     {/* <div className='h-screen w-screen bg-login' style={{ backgroundPosition: "0% 0%", backgroundSize: "cover" }}> */}
    //     <div className='h-screen    sm:w-1/2'>
    //         <div className="flex flex-col h-[100%] justify-center lg:px-4 p-4">
    //             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //                 <div className="mx-auto font-bold font-kat text-txt-neavy text-4xl text-center font-kat">Amansas</div>
    //                 <h2 className="mt-10 text-center ext-txt-neavy  text-2xl leading-9 tracking-tight font-semibold  font-poppins">Sign in to your account</h2>
    //             </div>


    //         </div>
    //     </div>
    // </>
    return checkauth ? <></> : <><WithSideImage sideImage={"bg-sideimage"} formclass={" h-auto"} labeling={"Login to your account"} form={<div className="mt-10 w-full sm:mx-auto sm:w-full sm:max-w-lg ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 m-8" action="" method="POST">
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="email" className="block text-sm text-[#13b497]  pl-4 font-extrabold leading-6 font-poppins  dark:text-darkBg">Email</label>
                </div>
                <div className="mt-2 flex">
                    <input id="username" name="username" type="email" autoComplete="username" {...register("email", { required: "This Field is required" })} className="p-2 block w-full border-b-2 py-1.5 text-black-900 sm:text-sm sm:leading-6 bg-[#b5efe6] rounded-md  text-black font-poppins outline-none border-gray-400 focus:border-blue-500 shadow-lg focus:shadow-indigo-500/30  rounded-4" placeholder='example@domain.com' />
                    <div className='relative right-7 top-[10px] text-[#0a2b25]' >
                        {
                            <>
                                <MdEmail className='w-5 h-5' />
                            </>
                        }
                    </div>
                </div>
                <p className='text-xs text-rose-500 font-extrabold mt-1'>{errors?.email?.message}</p>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm pl-4 font-extrabold leading-6 text-[#13b497] font-poppins dark:text-darkBg">Password</label>
                </div>
                <div className="mt-2 flex">
                    <input id="password" onChange={(e) => setPassword(e.target.value)} name={password} type={showPassword ? 'text' : 'password'} autoComplete="current-password" {...register("password", { required: "This Field is required" })} className="p-2 block w-full border-b-2  py-1.5 text-black-900 sm:text-sm sm:leading-6 rounded-md bg-[#b5efe6] text-black font-poppins outline-none border-gray-400 focus:border-blue-500 shadow-lg focus:shadow-indigo-500/30" placeholder="•••••••••••" />
                    <div className='relative right-7 top-[10px] cursor-pointer text-[#0a2b25]' onClick={toggleEye}>
                        {
                            (!showPassword) ? (<><FaEyeSlash className='w-5 h-5' /></>) : (<><IoEye className='w-5 h-5' /></>)
                        }
                    </div>
                </div>
                <p className='text-xs text-rose-500 font-extrabold mt-1'>{errors.password?.message}</p>
            </div>
            <div className='flex w-full pt-4'>
                {/* <button onClick={() => {
                navigate('/register')
            }} type="button" className="flex w-full justify-center rounded-full bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-bg-pbutton hover:animate-pulse buttonAnim border-2 hover:border-2 border-gray-700 hover:border-gray-700">Register</button> */}
                <button type="submit" className="flex w-full justify-center rounded-lg py-1.5 text-sm leading-6 text-white font-extrabold shadow-sm focus-visible:outline 
                    focus-visible:outline-2 mr-4  focus-visible:outline-offset-2  buttonAnim border-[1.5px] border-[#0e8670] font-poppins transition
                    duration-1000 ease-in-out hover:bg-[#3e454d] hover:text-white bg-[#13b497] hover:border-gray-500 hover:border-[1.5px]">Sign in</button>
            </div>
            <div className="flex items-center justify-between space-x-3 mr-4">
                <hr className="flex-grow border-t border-[#13b497]" />
                <p className="text-center text-[#dbbf96] text-[13px] font-bold">Or</p>
                <hr className="flex-grow border-t border-[#13b497]" />
            </div>
            <div className='flex justify-center'>
                <button className="btn text-[#cbaf87] text-sm font-semibold float-right mr-2 hover:underline hover:font-extrabold" onClick={() => { navigate('/setupPassword')}} >Change Password?</button>
                <button className="btn text-[#13b497] text-sm font-semibold float-right mr-5 hover:underline hover:font-extrabold" onClick={() => { navigate('/register')}} >Forgot Password?</button>
                </div>
        </form>
        {/* <div className="p-0 m-2 flex justify-center items-center"> */}
            {/* <div>
                <p className="text-neavy text-sm">Don't have an account? </p>
            </div> */}
            {/* <div onClick={() => { navigate('/register')}} > */}
                {/* <button className="btn text-neavy text-sm ml-2 ">Sign Up</button> */}
            {/* </div> */}
        {/* </div> */}
    </div>} /></>




};

export default Login;
