import React, { useEffect, useState } from 'react';
import { UilMultiply  } from '@iconscout/react-unicons'

const NewLookAlert = ({ text, notifyType, notifyCat,showAlert,setshowAlert }) => {


    let colorList = {
        "error": ["bg-red-900", "bg-red-500"],
        "alert": ["bg-red-900", "bg-red-500"],
        "warning": ["bg-yellow-900", "bg-yellow-500"],
        "success": ["bg-green-900", "bg-green-500"],
        "info": ["bg-blue-900", "bg-blue-500"]
    }

    // console.log(notifyType, "notifyType colorList", colorList)
    return <div>
        {showAlert?<div class={` text-center py-4 px-4`}>
            <div class={`${colorList[notifyType][0]} p-2 items-center text-white leading-none lg:rounded-full flex lg:inline-flex rounded-2xl`} role="alert">
                <span class={`${colorList[notifyType][1]} flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3`}>{notifyCat}</span>
                <span class="font-semibold mr-2 text-left flex-auto">{text}</span>

                <span onClick={(e)=>{
                    setshowAlert(false)
                }}><UilMultiply /></span>




                {/* <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg> */}
            </div>
        </div>:<></>}
    </div>
}



export default NewLookAlert
