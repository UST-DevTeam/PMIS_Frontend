// import React, { useState } from 'react';

// import * as Unicons from '@iconscout/react-unicons';
// import MenuItem from './MenuItem';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import CommonActions from '../store/actions/common-actions';

// const TopBar = ({ sidebarOpen, setsidebarOpenn }) => {

//     const dispatch = useDispatch()
//     const { state } = useLocation()
//     const name = state?.name
//     const navigate = useNavigate()
//     // console.log(useLocation(), "userloc")

//     const calllogout = () => {
//         // localStorage.setItem("auth",false)
//         // localStorage.removeItem("token")
//         // localStorage.removeItem("user")
//         // navigate("/login")

//         dispatch(CommonActions.logoutCaller(() => {
//             navigate("/login")
//         }))
//     }

//     return <>

//         <div class="flex justify-between ml-0 px-3 py-3 bg-oppprimaryLine overflow-y-auto duration-150 bg-topbarLine dark:bg-topbarLine font-oxygen font-bold">
//             {/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" onClick={() => {
//                 console.log('sdfjhkhkjshd')
//                 setsidebarOpenn(prev => !prev)
//             }} aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//                 <span class="sr-only">Open sidebar</span>
//                 <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
//                 </svg>
//             </button> */}
//             <div className='flex space-x-4 items-center'>
//                 <button onClick={() => { setsidebarOpenn(prev => !prev) }} className={`${sidebarOpen && 'rotate-180'}`}>
//                     {/* <Unicons.UilArrowCircleLeft size="36" style={{ color: "white" }} /> */}
//                     {/* <Unicons.UilArrowRight
//                     className="hover:text-heading transition-all duration-300 text-white"
//                     size="24"
//                     // style={{ color: isHovered ? "green" :"white",
//                     // transition: 'all 300ms ease-in-out'
//                     // }}
//                     // onMouseEnter ={()=>{setIsHovered(true)}}
//                     // onMouseLeave ={()=>{setIsHovered(false)}}
//                     /> */}
//                 <svg class="w-6 h-6" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
//                 </svg>
//                 </button>
//                 <h1 className='font-semibold text-white'>{name || ""}</h1>
//             </div>

//             <div onClick={() => { calllogout() }} className='dark:text-white flex space-x-1 cursor-pointer items-center'>
//                 <span className='text-white pr-1 hover:text-heading hover:cursor-pointer'>Logout</span>
//                 <Unicons.UilSignout fill="#13b497" className="hover:text-heading hover:cursor-pointer" />
//             </div>
//         </div>

//     </>
// }

// export default TopBar

import React, { useState, useEffect, useRef } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CommonActions from "../store/actions/common-actions";
import ProfileBar from "./ProfileBar";
import NotificationBar from "./NotificationBar";

const TopBar = ({ sidebarOpen, setsidebarOpenn }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupVisibleBody, setPopupVisibleBody] = useState(<></>);
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const { state } = useLocation();
  const name = state?.name;
  const email = state?.email;
  const navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));
  let empName = user?.empName;
  let roleName = user?.roleName;
  let empCode = user?.empCode;

  const calllogout = () => {
    dispatch(
      CommonActions.logoutCaller(() => {
        navigate("/login");
      })
    );
  };

  const handleLogoutClick = () => {
    setPopupVisible((prev) => !prev);
    setPopupVisibleBody(<ProfileBar modalRef={modalRef} roleName={roleName} calllogout={calllogout}/>)
  };

  const handleNotificationClick = () => {
    setPopupVisible((prev) => !prev);
    setPopupVisibleBody(<NotificationBar modalRef={modalRef} />)
    
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between ml-0 px-3 py-3 bg-oppprimaryLine overflow-y-auto duration-150 bg-topbarLine dark:bg-topbarLine font-oxygen font-bold">
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => {
              setsidebarOpenn((prev) => !prev);
            }}
            className={`${sidebarOpen && "rotate-180"}`}
          >
            {/* <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="# f4d3a8"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg> */}
            <svg
  className="w-6 h-6"
  aria-hidden="true"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="30%" stopColor="#f4d3a8"/> 
      <stop offset="100%" stopColor="#22c55e"/> 
    </linearGradient>
  </defs>
  <path
    fill="url(#gradient1)"
    clipRule="evenodd"
    fillRule="evenodd"
     d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
  />
</svg>

          </button>
          <h1 className="font-semibold text-white">{name || ""}</h1>
        </div>

        <div className="relative flex ">
          <div
            onClick={handleNotificationClick}
            className="dark:text-white flex space-x-1 cursor-pointer items-center pr-2"
          >
            <Unicons.UilBell
              fill="#13b497"
              className="hover:text-heading hover:cursor-pointer"
            />
          </div>
          <div
            onClick={handleLogoutClick}
            className="dark:text-white flex space-x-1 cursor-pointer items-center"
          >
            <span className="text-[#ffe1bb] hover:text-heading hover:cursor-pointer font-extrabold">
              {empName}
            </span>
            <Unicons.UilSignout
              fill="#13b497"
              className="hover:text-heading hover:cursor-pointer"
            />
          </div>
        </div>
        {popupVisible && (
            popupVisibleBody
        )}
      </div>
    </>
  );
};

export default TopBar;
