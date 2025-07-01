import React, { useEffect, useState } from 'react';
import { UilMultiply  } from '@iconscout/react-unicons'

const NewLookBadge = ({ text,notifyType }) => {
    let colorList = {
        "error": ["bg-red-900", "bg-red-500"],
        "alert": ["bg-red-900", "bg-red-500"],
        "warning": ["bg-yellow-900", "bg-yellow-500"],
        "success": ["bg-green-900", "bg-green-500"],
        "info": ["bg-blue-900", "bg-blue-600"]
    }
    // console.log(notifyType, "notifyType colorList", colorList)
    return <div><span class={`${colorList[notifyType][1]} flex rounded-full uppercase px-2 py-1 w-fit text-xs text-white font-bold mr-3`}>{text}</span></div>
}

export default NewLookBadge
