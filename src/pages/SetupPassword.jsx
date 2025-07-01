import React from "react";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import CommonForm from "../components/CommonForm";
import AuthActions from "../store/actions/auth-actions";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../utils/url";
import { ALERTS } from "../store/reducers/component-reducer";
import WithSideImage from "../components/WithSideImage";
const field = [{
    logo: baseUrl + "/logo.png",
    firstname: "Name",
    surname: "surname",
    email: "E-mail",
    password: "Password",
    confirmPassword: "confirmPassword",
    phonenumber: "Phone Number",
    aregister: "Already Register",
    regiter: "Register"
}]

export default function SetupPassword() {
    const { uid } = useParams();
    const dispatch = useDispatch()
    let userRole = useSelector((state) => {
        return state?.auth?.userRole
      })

    //   props: { onPaste: (e) => e.preventDefault() }, (for disabled the paste)

    const navigate = useNavigate()
    let Form = [
         { label: "E-mail",name: "email", value: "email", type: "text", props: "", required: true, placeholder: "example@domain.com" },
        { label: "Current Password", name: "currentpassword", value: "currentpassword", type: "password", props: "", required: true, placeholder:"current password ",  },
        { label: "New Password", name: "newPassword", value: "newPassword", type: "password", props: "", required: true, placeholder:"8+ characters (At least 1 Letter & 1 Number)",  },
        { label: "Confirm Password", name: "confirmPassword", value: "confirmPassword", type: "password", props: "", required: true, placeholder:"confirm New Password", },
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
        
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
         
            if (data.newPassword?.length < 8) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text:"• Password must be at least 8 characters long",
                };
                dispatch(ALERTS(msgdata));
                return             
            }
            if (data.newPassword !== data.confirmPassword) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: "New password and confirm password doesn't match",
                };
                dispatch(ALERTS(msgdata)); 
                return; 
            }
            if (!/(?=.*[a-zA-Z])/.test(data.newPassword)) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text:"• Password contains at least an alphabets (lowercase or uppercase)",
                };
                dispatch(ALERTS(msgdata));
                return            
            }
            if (data.newPassword === data?.currentpassword) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text:"• New password must be different from current password.",
                };
                dispatch(ALERTS(msgdata));
                return           
            }
            if (!/.*[0-9].*/.test(data?.newPassword)) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text:"• Password contains at least a number (0-9)",
                };
                dispatch(ALERTS(msgdata));
                return
            }  
    
        dispatch(AuthActions.setuppassword(data,() => navigate("/login")));};
        
    // const onTableViewSubmit = (data) => {
    //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    //     if (!passwordRegex.test(data.rePassword)) {
    //         let missingCriteria = [];
    //         if (data.rePassword.length < 8) {
    //             missingCriteria.push("at least 8 characters long");
    //         }
    //         if (!/(?=.*[a-z])/.test(data.rePassword)) {
    //             missingCriteria.push("small letter");
    //         }
    //         if (!/(?=.*[A-Z])/.test(data.rePassword)) {
    //             missingCriteria.push("capital letter");
    //         }
    //         if (!/(?=.*\d)/.test(data.rePassword)) {
    //             missingCriteria.push("number");
    //         }
    //         if (!/(?=.*[@$!%*?&])/.test(data.rePassword)) {
    //             missingCriteria.push("special character");
    //         }
    
    //         let msgdata = {
    //             show: true,
    //             icon: "error",
    //             buttons: [],
    //             type: 1,
    //             text: `Password is missing: ${missingCriteria.join(", ")}.`,
    //         };
    //         dispatch(ALERTS(msgdata));
    //         return;
    //     }
    
    //     if (data.rePassword !== data.confirmPassword) {
    //         let msgdata = {
    //             show: true,
    //             icon: "error",
    //             buttons: [],
    //             type: 1,
    //             text: "Password and Confirm Password do not match",
    //         };
    //         dispatch(ALERTS(msgdata));
    //         return;
    //     }
    
    //     dispatch(
    //         AuthActions.setuppassword(
    //             data,
    //             () => navigate("/login")
    //         )
    //     );
    // };
    return <>
        
        <WithSideImage sideImage={"bg-setuppassword"} formclass={" h-auto p-6" } 
        form={<>
            <CommonForm classes={"w-11/12 pl-10 "} Form={Form} errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <div className="flex space-x-2 p-3 justify-center">
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
        </>} labeling={"Reset Current Password"} />
    </>
}


