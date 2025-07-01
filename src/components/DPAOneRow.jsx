
import React, { useState } from 'react';
import { UilInfoCircle } from '@iconscout/react-unicons'
import Modal from './Modal';
import { useSelector } from 'react-redux';
import Table from './Table';
import TableJson from './TableJson';


const DPAOneRow = ({ name, id , fetchBackend}) => {


    const [openModal, setOpenModal] = useState(false)

    let data_from_socket = useSelector((state) => {
        console.log(state, "statedsadsadsadsadasdsada")
        let interdata = state?.websocket?.data_from_socket
        return interdata
    })


    console.log(name, data_from_socket[id]?.["columns"], "name,id data_from_socket")

    // return [<td>1</td>,<td>1</td>,<td>1</td>,<td>1</td>]
    return [<td className=''><>

        <div className='flex justify-between relative w-40' onClick={() => {
            if (data_from_socket[id] != undefined) {
                setOpenModal(true)
            }
        }}>
            {
                // data_from_socket[id]==undefined
                // fivedotloader bg-secLine
                data_from_socket[id] == undefined && fetchBackend ? <div className=''>Processing</div> : <>
                    <h1 className='-pointer'>{name}</h1>
                    <UilInfoCircle size="14" />
                    
                    </>
            }

        </div>



        <Modal modalHead={name} children={<>
            {
                data_from_socket[id] != undefined?<>
                <div className='overflow-scroll'><TableJson headers={data_from_socket[id]["columns"]} columns={data_from_socket[id]["data"]}/></div>
                </>:<></>
            }
        </>} setIsOpen={setOpenModal} isOpen={openModal} size={"xl"} closeButton={true}/>


    </></td>,<td className=''>{data_from_socket[id] == undefined && fetchBackend ? "..." : data_from_socket?.[id]?.["data"][0]?.["PreValueAvg"]?.toFixed(2)}</td>,<td className=''>{data_from_socket[id] == undefined && fetchBackend ? "..." : data_from_socket?.[id]?.["data"][0]?.["PostValueAvg"]?.toFixed(2)}</td>,<td className=''>{data_from_socket[id] == undefined && fetchBackend ? "..." : data_from_socket?.[id]?.["data"][0]?.["DeltaAvg"]?.toFixed(2)}</td>]
};

export default DPAOneRow;
