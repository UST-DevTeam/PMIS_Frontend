import React from 'react'
import { UilImport,UilCheckCircle,UilTimesCircle, UilFolderCheck, UilCheckSquare } from '@iconscout/react-unicons'
import Button from './Button'


const DownloadButton = ({ onClick }) => {
    return (
        <div className='flex justify-around'>
            <Button name={""} classes={"w-10"} icon={<UilImport  size="18" className={"hello"} />} onClick={onClick} />
        </div>
    )
}

export default DownloadButton
