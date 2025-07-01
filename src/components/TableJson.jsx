// import React, { useCallback, useEffect, useState } from 'react';
// import Modalmoreinfo from './Modalmoreinfo';
// import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
// import Modal from './Modal';

// import { UilPlusCircle, UilTimes, UilBars } from '@iconscout/react-unicons'
// import RoundedButton from './RoundedButton';
// import Button from './Button';
// // import styled from "styled-components";

// // const Handle = 

// const RowHandler = SortableHandle(() => <div className="handle text-center"><UilBars /></div>);

// const TableRow = ({ data, columns, editing, setlisting, indexing, className }) => {
//     console.log(data, columns, indexing, "data, columns")
//     return <tr>
//         <td>
//             <div className="firstElement">
//                 {editing ? <RowHandler /> : <></>}
//             </div>
//         </td>
//         {
//             Object.entries(data).map((itm) => {
//                 return <td>{itm[1]}</td>
//             })
//         }
//         <td>
//             <RoundedButton onClick={() => {
//                 setlisting(prev => {
//                     prev.pop()
//                     console.log(prev, "prevprevprev")
//                     return [...prev]
//                 })
//             }} icon={<UilTimes />} />

//         </td>

//         {/* <td><input className='border-2 border-black' type='text' /></td>
//         <td><input className='border-2 border-black' type='text' /></td>
//         <td><input className='border-2 border-black' type='text' /></td>
//         <td><select className='border-2 border-black'>
//             <option>Text</option>
//             <option>File</option>
//             <option>Select</option>
//         </select></td>
//         <td><input className='border-2 border-black' type='text' /></td> */}
//     </tr>

// }

// const TableJson = ({ editing, headers, functioning, setlisting, listing, columns, submitonClick }) => {

//     const [openModal, setOpenModal] = useState(false)
//     const [modalBody, setModalBody] = useState("")


//     console.log(columns, "columnscolumnscolumns")
//     const [items, setItems] = useState([
//         "", "", "", ""
//     ]);

//     const onSortEnd = useCallback(({ oldIndex, newIndex }) => {



//         console.log(oldIndex, newIndex, "oldIndex, newIndex")



//         setlisting(oldItems => {
//             console.log(oldItems[oldIndex]["index"], oldItems[newIndex]["index"], "oldItemsoldItemsoldItems")

//             const newColumns = arrayMove(oldItems, oldIndex, newIndex);
//             console.log(newColumns, "oldItemsoldItemsoldItems")
//             // Update the index of each column based on the new order
//             // return newColumns.map((column, index) => ({ ...column, index: index + 1 }));

//             // let temp=oldItems[newIndex]["index"]
//             // oldItems[oldIndex]["index"]=oldItems[newIndex]["index"]
//             // oldItems[newIndex]["index"]=temp

//             // console.log(oldItems,"oldItemsoldItemsdsdasdoldItems")

//             // let dewq=newColumns.map((itew,index)=>{

//             //     console.log(itew,"itewitewitewitew")

//             //     itew["index"]=index+1
//             //     return itew
//             // })

//             // console.log(dewq,"dewqdewqdewqdewq")

//             return newColumns
//         });
//     }, []);


//     useEffect(() => {
//         // alert("sadadasdsadsa")
//     }, [columns])


//     const SortableCont = SortableContainer(({ children }) => {
//         return <tbody>{children}</tbody>;
//     });


//     const SortableItem = SortableElement(props => <TableRow {...props} />);
//     return <>
//         <table border={1} className='h-auto w-full table-auto'>
//             <thead className='bg-primaryLine text-white sticky -top-1 z-10 '>
//                 <tr>

//                     <th className='border-gray-400 border-2 w-28'></th>
//                     {
//                         headers.map((itm) => {
//                             return <th className='border-gray-400 border-2 w-96'>
//                                 {itm}
//                             </th>
//                         })
//                     }
//                     <th className='border-gray-400 border-2 w-20 text-center'>Acton</th>
//                 </tr>
//             </thead>

//             <SortableCont
//                 onSortEnd={onSortEnd}
//                 axis="y"
//                 lockAxis="y"
//                 lockToContainerEdges={true}
//                 lockOffset={["30%", "50%"]}
//                 helperClass="helperContainerClass"
//                 useDragHandle={true}
//             >
//                 {columns.map((value, index) => {

//                     console.log(value, index, "value, index")
//                     return <SortableItem
//                         key={`item-${index}`}
//                         index={index}
//                         editing={editing}
//                         indexing={index}
//                         data={value}
//                         columns={columns}
//                         setlisting={setlisting}
//                     />
//                 })}
//             </SortableCont>
//             {/* <tbody className='overflow-scroll'> */}
//             {/* {
//                     columns.map((itm,index) => {
//                         return <tr >
//                             {headers.map((innerItm) => {
//                                 return <td className='border-gray-400 border-2 whitespace-nowrap  w-96'>
//                                     <Modalmoreinfo setModalBody={setModalBody} setOpenModal={setOpenModal} value={itm[innerItm]} />
//                                 </td>
//                             })}
//                         </tr>

//                     })
//                 } */}
//             {/* </tbody> */}


//         </table>


//         <Modal children={modalBody} setIsOpen={setOpenModal} isOpen={openModal} size={"sm"} />
//     </>
// };

// export default TableJson;


import React, { useState } from 'react';
import Modalmoreinfo from './Modalmoreinfo';
import Modal from './Modal';

const TableJson = ({ headers, columns, check, setCheck = () => { } }) => {

    const [openModal, setOpenModal] = useState(false)
    const [modalBody, setModalBody] = useState("")


    console.log(headers, columns, "headers, columnsheaders, columns")
    columns.map((itm) => {


        // console.log(itm, "testtesttesttest")
        return headers.map((innerItm) => {
            // console.log(itm, innerItm, "testtesttesttest")
        })
    })
    return <>
        <div className='h-[67.4vh] overflow-x-scroll'>
            <table border={1} className=' table-auto  w-full'>
                <thead className='bg-primaryLine text-white sticky -top-1 z-10'>
                    <tr>
                        {
                            headers.map((itm) => {
                                return itm != "C" ? <th className='border-gray-400 border-[1.5px]'>
                                    {itm}
                                </th> : <th className='border-gray-400 border-[1.5px]'>
                                    <input type={'checkbox'} onChange={(e, index) => {
                                        console.log(e.target.checked, columns, check, index, "e.target.checked")

                                        if (e.target.checked) {
                                            setCheck(prev => {
                                                return columns.map((itm, index) => {
                                                    return index + 1
                                                })
                                            })
                                        } else {
                                            setCheck([])
                                        }
                                    }} />
                                </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody className='overflow-scroll h-8'>
                    {
                        columns.map((itm) => {
                            return <tr>
                                {headers.map((innerItm) => {
                                    return <td className='border-gray-400 border-[1px] whitespace-nowrap text-[12px] text-white text-center'>
                                        <Modalmoreinfo setModalBody={setModalBody} setOpenModal={setOpenModal} value={itm[innerItm]} />
                                    </td>
                                })}
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

        <Modal children={modalBody} setIsOpen={setOpenModal} isOpen={openModal} size={"sm"} />

    </>
};

export default TableJson;
