import React, { useEffect, useState } from "react";
import "react-querybuilder/dist/query-builder.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonForm from "../../../components/CommonForm";
import MyHomeActions from "../../../store/actions/myHome-actions";

const ManagePolicy = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const getManageVendorDetails = useSelector((state) => {
    return state.myHomeData.getMyPolicy[0] || {};
  });

  let PersonalInformation = Object.keys(getManageVendorDetails).map((itm) => ({
    type: "sdisabled",
    label: itm,
    value:
      getManageVendorDetails[itm] === true
        ? "Yes"
        : getManageVendorDetails[itm] === false
        ? "No"
        : getManageVendorDetails[itm],
    name: itm,
  }));

  useEffect(() => {
    dispatch(MyHomeActions.getMyPolicy());
  }, [dispatch]);

  useEffect(() => {
    PersonalInformation.forEach((itm) => {
      setValue(itm.name, itm.value);
    });
  }, [getManageVendorDetails, setValue]);

  return (
    <>
      <div className=" w-full">
        <div className="">
          {/* <UiTopBar /> */}
          <div className="w-full mt-2 bg-[#3e454d] ">
            <div class="grid grid-cols-12 gap-2 m-2 bg-gray-800 border-[1.5px] rounded-lg">
              <div className="col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <CommonForm
                    classes={
                      "grid-cols-4 gap-4 w-full h-auto bg-[#3e454d] p-4 rounded-lg"
                    }
                    errors={errors}
                    Form={PersonalInformation}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagePolicy;
