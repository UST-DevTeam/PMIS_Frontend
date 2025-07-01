
import React, { useEffect, useState } from "react";
import CreateFormField from "./CreateFormField";



const TableRows = ({listing,Form}) => {


    console.log(listing,Form,"listing,Formlisting,Form")

    
    return listing.map((itm, indexes) => {
        return Form.map((its, innerIndex) => {
            console.log(its, "indexes", indexes, "innerIndex", innerIndex, "itsitsitsits")
            return {
                [its.label]: <CreateFormField itm={{
                    ...its,

                    // onChanging: (e) => {
                    //   console.log(indexes, e.target.value, "dsadasdasdasdasd")
                    // },
                    props: {
                        onChange: (e) => {
                            console.log(indexes.toString(), e.target.value, "dsadasdasdasdasd")
                        }
                    }
                }} index={indexes} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            }
        }).reduce((acc, obj) => {
            return { ...acc, ...obj };
        }, {});
    })
}

export default TableRows;