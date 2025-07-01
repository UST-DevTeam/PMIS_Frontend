import React from 'react'
import { UilTrashAlt } from '@iconscout/react-unicons'
import Button from './Button'
const DeleteButton = ({ onClick, size = 18 }) => {
    return (
        <div className='flex justify-around'><Button name={""} classes={"w-10 bg-rose-500"} icon={<UilTrashAlt size={size}  className={"hello"} />} onClick={onClick} /></div>
    )
}
export default DeleteButton