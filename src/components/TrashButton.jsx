import React from 'react'
// import { UilEdit } from '@iconscout/react-unicons'
import Button from './Button'
const TrashButton = ({ onClick }) => {

    return (
        // <div className='flex justify-around'><Button name={""} classes={"w-10"} icon={<UilEdit size="18" className={"hello"} />} onClick={onClick} /></div>
        <div className='flex justify-around'><Button name={"Trash"} classes={"w-auto h-6 bg-gradient-to-r from-rose-600 to-orange-700"} onClick={onClick} /></div>
    )
}

export default TrashButton