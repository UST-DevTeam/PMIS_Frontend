
import React from "react";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import CommonForm from "../components/CommonForm";
import AuthActions from "../store/actions/auth-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/url";
import WithSideImage from "../components/WithSideImage";
const field = [{
    logo: baseUrl + "/logo.png",
    firstname: "Name",
    surname: "Surname",
    email: "E-mail",
    password: "Password",
    phonenumber: "Phone Number",
    aregister: "Already Register",
    regiter: "Register",
    roleName: "roleName"
}]
export default function Registration() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let Form = [

        { label: "E-mail",name: "email", value: "email", type: "text", props: "", required: true, placeholder: "example@domain.com" },
        // {
        //     label: "Country Code",
        //     value: "",
        //     name: "countryCode",
        //     option: countries,
        //     type: "select",
        //     required: true,
        //     props: {
        //         //   onChange: ((e) => {
        //         //   }),
        //     },

        // },
        // {
        //     label: "Phone Number", name: "mobile", value: "mobile", type: "text", props: "",
        //     required: true,
        //     placeholder: "",
        //     amp: [{
        //         type: "select",
        //         name: "currency",
        //         styling: "w-20",
        //         option: countries,
        //         value: "currency"
        //     }]
        // },

        // {
        //     label: "Role", name: "roleName", value: "", type: "radio", props: {}, required: true, option: [
        //         { "label": "INVESTOR", "value": "Investor" },
        //         { "label": "FUND SEEKER", "value": "Fund Seeker" },
        //         { "label": "CHARITABLE ORGANISATION", "value": "Charitable Organisation" }
        //     ]
        // }
    ]
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    const onTableViewSubmit = (data) => {
        dispatch(AuthActions.register(data, () => {navigate("/register")}));
    }
    return <>
        <WithSideImage sideImage={"bg-regsideimage"} formclass={" h-auto p-8"} form={<>
            <CommonForm classes={"grid-cols-1 p-4"} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <div className="flex space-x-2 p-4 justify-center">
                <Button
                    classes="w-24 justify-center rounded-lg text-sm leading-6 text-white font-extrabold shadow-sm focus-visible:outline 
                                focus-visible:outline-2 focus-visible:outline-offset-2 buttonAnim border-[1.5px] border-[#0e8670] font-poppins transition
                                duration-1000 ease-in-out hover:bg-[#3e454d] hover:text-white bg-[#13b497] hover:border-gray-500 hover:border-[1.5px]"
                    onClick={handleSubmit(onTableViewSubmit)}
                    name="Submit"

                />
                <button
                    type="button"
                    className="flex w-24 justify-center rounded-lg py-1.5 text-[12.5px] font-semibold leading-6 text-white shadow-sm focus-visible:outline 
                                focus-visible:outline-2 focus-visible:outline-offset-2 buttonAnim border-[1.5px] border-[#0e8670] font-poppins transition
                                duration-1000 ease-in-out hover:bg-[#3e454d] hover:text-white bg-[#13b497] hover:border-gray-500 hover:border-[1.5px]"
                    onClick={() => navigate('/login')}
                >
                    Sign in
                </button>
                </div>
        </>} labeling={"Find Your Account"} />
    </>
}
