import React from 'react'
import { UilEdit } from '@iconscout/react-unicons'
import Button from './Button'
const RoundedButton = ({ onClick,icon,classes="" }) => {

    return (
        <div className='flex justify-around'>
        {/* <Button name={""} className={"w-12 rounded-full "} icon={icon} onClick={onClick} />
         */}
        <button onClick={onClick} className={`${classes} w-8 bg-pbutton  flex items-center rounded-full p-1 text-xs font-semibold leading-6 text-white shadow-md hover:bg-onHoverButton transition-colors duration-500`}>
            {name} {icon}
        </button>
        </div>
    )
}

export default RoundedButton