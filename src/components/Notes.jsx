import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import CommonForm from "./CommonForm";
import Button from "./Button";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalBody, setModalBody] = useState(<></>);
  const [modalHead, setModalHead] = useState(<></>);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const notesAddForm = [
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

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage when notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleNoteSubmit = (res) => {
    setNotes((prev) => [...prev, res?.note]);
    reset();
    setIsOpen(false);
  };

  const handleDeleteNote = (index) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
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
          classes="w-1/12"
          name={"Add Note"}
          className="px-4 py-1  border-txt-neavy text-txt-neavy border w-fit h-fit rounded-sm text-sm"
          onClick={() => {
            setIsOpen(true);
            setModalHead(<h1>Add Note</h1>);
            setModalBody(
              <div>
                <CommonForm
                  classes={"grid-cols-1 gap-1"}
                  Form={notesAddForm}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                />
                <Button name="Save" onClick={handleSubmit(handleNoteSubmit)} />
              </div>
            );
          }}
        ></Button>
      </div>
      <div>
        {notes.length === 0 ? (
          <div className="text-center">
            You do not have any notes for this investor yet.
          </div>
        ) : (
          <ul className="list-disc pl-5">
            {notes.map((note, index) => (
              <li key={index} className="w-full flex justify-between my-4">
                <div className="grid">
                  <div>{note}</div>
                  <div>
                    <Button
                      name="Delete Note"
                      onClick={() => handleDeleteNote(index)}
                      classes="w-1/10 my-3"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notes;

