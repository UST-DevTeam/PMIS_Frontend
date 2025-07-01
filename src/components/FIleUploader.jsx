import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import CommonForm from './CommonForm';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { useDispatch } from 'react-redux';
import CommonActions from "../store/actions/common-actions";

const FileUploader = ({ isOpen, setIsOpen,fileUploadUrl,onTableViewSubmit,tempbtn=false, tempbtnlink="", label="Template",head="Upload File"}) => {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()

    let Form = [
        {
            label: "Excel file",
            value: "",
            name: "uploadedFile",
            type: "file",
            required: false,
            props: {},
            classes: "col-span-1 sm:col-span-1 flex justify-between font-bold items-center"
        },
    ]

    
    return <>

        <Modal size={"sm"} modalHead={head} children={
            <>
                <div>{tempbtn && <Button classes={"w-auto flex ml-auto mb-1 bg-[#d07407] text-black"} name={label} onClick={() => {
                                dispatch(CommonActions.commondownload(tempbtnlink[0],tempbtnlink[1]))}} 

                            />
                    }
                </div>
                <CommonForm
                    classes={"grid-cols-1 gap-1 p-4"}
                    Form={Form}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                />
                {<Button classes={"w-auto mx-auto mb-2 py-1 font-extrabold px-50 py-5 text-[16px]"} onClick={(handleSubmit(onTableViewSubmit))} name="Submit" />}
            </>
        } isOpen={isOpen} setIsOpen={setIsOpen} />

    </>
}


export default FileUploader;