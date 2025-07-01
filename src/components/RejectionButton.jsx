import React from 'react'
import {UilTimes,UilTimesCircle,UilTimesSquare} from '@iconscout/react-unicons'
import Button from './Button'


const RejectionButton = ({ onClick }) => {
    return (
        <div className='flex justify-around'>
            <Button name={""} classes={"w-10 bg-rose-500 hover:bg-rose-600 text-white"} icon={<UilTimesSquare  size="18" className={"hello"} />} onClick={onClick} />
        </div>
    )
}

export default RejectionButton