import React from 'react';

const Table = ({ headers, classes = "", columns, commonCols = false }) => {

    console.log(headers, columns, commonCols, "headers, columns, commonCols")
    return <>
        <table border={0} className={'w-[100%] table-auto ' + classes}>
            <thead>
                <tr>
                    {
                        headers.map((itm) => {
                            return <th className={commonCols ? 'border-gray-800 border-t-[0.5px]' : 'border-gray-400 border-2'}>
                                {itm}
                            </th>
                        })
                    }
                </tr>
            </thead>



            {commonCols ? <tbody>

                {columns.map((itm) => {
                    return <tr className=' border-gray-800 border-t-[0.5px] text-xs last:border-b-0 '>
                        {
                            itm
                        }
                    </tr>
                })}
                {/* {
                        columns.map((itm) => {
                            return <tr>
                                {itm.map((innerItm) => {
                                    return <td className='border-gray-400 border-2 text-sm'>
                                        {innerItm}
                                    </td>
                                })}
                            </tr>

                        })
                    } */}
            </tbody> :
                <tbody>
                    {
                        columns.map((itm) => {
                            return <tr>
                                {itm.map((innerItm) => {
                                    return <td className='border-gray-400 border-2 text-sm py-2 capitalize font-poppins border-s-0 border-e-0'>
                                        {innerItm}
                                    </td>
                                })}
                            </tr>

                        })
                    }
                </tbody>
            }
        </table>
    </>
};

export default Table;
