import React, { useState } from 'react';

import * as Unicons from '@iconscout/react-unicons';
import MenuItem from './MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CommonActions from '../store/actions/common-actions';

const UiTopBar = ({ sidebarOpen, setsidebarOpenn }) => {

    const dispatch = useDispatch()

    // localStorag


    const { state } = useLocation()
    const name = state?.name
    const navigate = useNavigate()
    // console.log(useLocation(), "userloc")

    const calllogout = () => {
        // localStorage.setItem("auth",false)
        // localStorage.removeItem("token")
        // localStorage.removeItem("user")
        // navigate("/login")


        dispatch(CommonActions.logoutCaller(() => {
            navigate("/login")
        }))
    }



    return <>

        <div class="flex justify-between ml-0 px-3 py-4 bg-oppprimaryLine overflow-y-auto duration-150 bg-topbarLine dark:bg-topbarLine">
            {/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" onClick={() => {
                console.log('sdfjhkhkjshd')
                setsidebarOpenn(prev => !prev)
            }} aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button> */}
            <div className='flex space-x-4 items-center'>
                <h1 className='text-white md:text-4xl text-3xl'>AMANSAS</h1>
                {/* <button onClick={() => { setsidebarOpenn(prev => !prev) }} className={`border-[1.5px] rounded-full ${sidebarOpen && 'rotate-180'}`}> */}
                {/* <Unicons.UilArrowCircleLeft size="36" style={{ color: "white" }} /> */}
                {/* <Unicons.UilArrowRight size="24" style={{ color: "white" }} /> */}
                {/* </button> */}
                {/* <h1 className='font-semibold text-white'>{name || ""}</h1> */}
            </div>

            {/* <div onClick={() => { calllogout() }} className='dark:text-white flex space-x-1 cursor-pointer items-center'>
                <span className='text-white pr-1'>Logout</span>
                <Unicons.UilSignout /></div> */}
        </div>

    </>
}



export default UiTopBar