import React, { useCallback, useEffect, useState } from 'react';
import Modalmoreinfo from './Modalmoreinfo';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import Modal from './Modal';

import { UilPlusCircle, UilTimes, UilBars } from '@iconscout/react-unicons'
import RoundedButton from './RoundedButton';
import Button from './Button';
import { SET_DYNAMIC_FORM_MOVE, SET_DYNAMIC_RM_INDEX } from '../store/reducers/projectList-reducer';
import { useDispatch } from 'react-redux';
// import styled from "styled-components";

const RowHandler = SortableHandle(() => <div className="handle text-center text-white"><UilBars /></div>);

const TableRow = ({ data, columns, editing, tabHead, indexing, className }) => {

    const dispatch = useDispatch()
    console.log(data, columns, indexing, "data, columns")
    return <tr>
        <td>
            <div className="firstElement">
                {editing ? <RowHandler /> : <></>}
            </div>
        </td>
        {
            Object.entries(data).map((itm) => {
                return <td>{itm[1]}</td>
            })
        }
        <td>
            <RoundedButton onClick={() => {
                dispatch(SET_DYNAMIC_RM_INDEX({ label: tabHead, indexToUpdate: indexing, reseter: false }))
            }} icon={<UilTimes />} />

        </td>
    </tr>

}

const TableJsonDynamic = ({ editing, headers, functioning, tabHead, listing, columns, submitonClick }) => {

    const [openModal, setOpenModal] = useState(false)
    const [modalBody, setModalBody] = useState("")

    const dispatch = useDispatch()

    console.log(columns, "columnscolumnscolumns")
    const [items, setItems] = useState([
        "", "", "", ""
    ]);

    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {



        console.log(oldIndex, newIndex, "oldIndex, newIndex")

        dispatch(SET_DYNAMIC_FORM_MOVE({ label: tabHead, oldIndex: oldIndex, newIndex: newIndex }))

        // dispatch(SET_DYNAMIC_FORM({ label: tabHead, value: { ...newars }, reseter: false }))

        // setlisting(oldItems => {
        //     console.log(oldItems[oldIndex]["index"], oldItems[newIndex]["index"], "oldItemsoldItemsoldItems")

        //     const newColumns = arrayMove(oldItems, oldIndex, newIndex);
        //     console.log(newColumns, "oldItemsoldItemsoldItems")
        //     // Update the index of each column based on the new order
        //     // return newColumns.map((column, index) => ({ ...column, index: index + 1 }));

        //     // let temp=oldItems[newIndex]["index"]
        //     // oldItems[oldIndex]["index"]=oldItems[newIndex]["index"]
        //     // oldItems[newIndex]["index"]=temp

        //     // console.log(oldItems,"oldItemsoldItemsdsdasdoldItems")

        //     // let dewq=newColumns.map((itew,index)=>{

        //     //     console.log(itew,"itewitewitewitew")

        //     //     itew["index"]=index+1
        //     //     return itew
        //     // })

        //     // console.log(dewq,"dewqdewqdewqdewq")

        //     return newColumns
        // });
    }, []);


    useEffect(() => {
        // alert("sadadasdsadsa")
    }, [columns])


    const SortableCont = SortableContainer(({ children }) => {
        return <tbody>{children}</tbody>;
    });


    const SortableItem = SortableElement(props => <TableRow {...props} />);
    return <>
        <div className='h-[66vh]'>   
            <table border={1} className='h-auto w-full table-auto bg-[#3e454d]'>
                <thead className='bg-primaryLine text-white text-[12px] sticky top-5 z-10  m-2 '>
                    <tr>
                        <th className='border-gray-400 border-[1.5px] w-28'> ☰ </th>
                        {
                            headers.map((itm) => {
                                return <th className='border-gray-400 border-[1.5px] w-96 '>
                                    {itm}
                                </th>
                            })
                        }
                        <th className='border-gray-400 border-[1.5px] w-20 text-center'>Action</th>
                    </tr>
                </thead>

                <SortableCont
                    onSortEnd={onSortEnd}
                    axis="y"
                    lockAxis="y"
                    lockToContainerEdges={true}
                    lockOffset={["30%", "50%"]}
                    helperClass="helperContainerClass"
                    useDragHandle={true}
                >
                    {columns.map((value, index) => {

                        console.log(value, index, "value, index")
                        return <SortableItem
                            key={`item-${index}`}
                            index={index}
                            editing={editing}
                            indexing={index}
                            data={value}
                            columns={columns}
                            tabHead={tabHead}
                        // setlisting={setlisting}
                        />
                    })}
                </SortableCont>
                {/* <tbody className='overflow-scroll'> */}
                {/* {
                    columns.map((itm,index) => {
                        return <tr >
                            {headers.map((innerItm) => {
                                return <td className='border-gray-400 border-2 whitespace-nowrap  w-96'>
                                    <Modalmoreinfo setModalBody={setModalBody} setOpenModal={setOpenModal} value={itm[innerItm]} />
                                </td>
                            })}
                        </tr>

                    })
                } */}
                {/* </tbody> */}


            </table>
        </div>

        <Modal children={modalBody} setIsOpen={setOpenModal} isOpen={openModal} size={"sm"} />
    </>
};

export default TableJsonDynamic;
