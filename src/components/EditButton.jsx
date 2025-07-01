import React from 'react'
import { UilEdit } from '@iconscout/react-unicons'
import Button from './Button'
const EditButton = ({ onClick, size = 18}) => {

    return (
        <div className='flex justify-around'><Button name={""} classes={"w-10"} icon={<UilEdit size={size}  className={"hello"} />} onClick={onClick} /></div>
    )
}

export default EditButton