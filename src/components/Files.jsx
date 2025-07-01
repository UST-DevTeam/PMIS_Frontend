import React, { useState } from "react";
import Modal from "./Modal";
import CommonForm from "./CommonForm";
import Button from "./Button";
import { useForm } from "react-hook-form";

const Files = () => {
  const [filesData, setFilesData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalBody, setModalBody] = useState(<></>);
  const [modalHead, setModalHead] = useState(<></>);

  const filesUploadForm = [
    { label: "file", value: "", name: "file", required: true, type: "file" },
    { label: "Note", value: "", name: "note", required: true, type: "text" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const handleFileSubmit = (res) => {
    console.log(res);

    setFilesData((prev) => {
      return [...prev, { file: [...res.file], note: res?.note }];
    });
    // reset();
    setIsOpen(false);
  };

  return (
    <div className="text-sm font-poppins">
      <Modal
        size={"sm"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalHead={modalHead}
      >
        {modalBody}
      </Modal>
      <div className="w-full flex justify-end">
        <Button
          name={"Upload File"}
          classes="px-4 py-1 w-fit h-fit"
          onClick={() => {
            setIsOpen(true);
            setModalHead(<h1>Upload File</h1>);
            setModalBody(
              <div>
                <CommonForm
                  classes={"grid-cols-1 gap-1"}
                  Form={filesUploadForm}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                />
                <Button
                  name="Upload"
                  onClick={handleSubmit(handleFileSubmit)}
                />
              </div>
            );
          }}
        >
        </Button>
      </div>
      <div>
        {filesData.length == 0 ? (
          <div className="text-center">
            There are no files for this investor yet.
          </div>
        ) : (
          filesData.map((cur, index) => {
            console.log(cur.file);
            return (
              <div key={index + cur.note} className="">
                {JSON.stringify(cur.file)} --- {cur.note}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Files;
