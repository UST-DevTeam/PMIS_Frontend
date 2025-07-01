
import React from 'react'
import { UilEye } from '@iconscout/react-unicons'
import Button from './Button'

const ViewButton = ({ onClick }) => {
    return (
        <div className='flex justify-around'>
            <Button name={""} classes={"w-10"} icon={<UilEye size="18" className={"hello"} />} onClick={onClick} />
        </div>
    )
}

export default ViewButton