import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import CommonForm from "./CommonForm";
import Button from "./Button";
import TextBox from "./FormElements/TextBox";

const Contacts = () => {
  const [contactList, setContactList] = useState([]);
  const [connectors, setConnectors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalBody, setModalBody] = useState(<></>);
  const [modalHead, setModalHead] = useState(<></>);

  const contactAddForm = [
    {
      label: "Full Name",
      value: "",
      name: "fullName",
      required: true,
      type: "text",
    },
    {
      label: "Position",
      value: "",
      name: "position",
      required: true,
      type: "text",
    },
    { label: "Email", value: "", name: "email", required: true, type: "text" },
    { label: "Phone", value: "", name: "phone", required: true, type: "text" },
  ];

  const connectorFieldForm = [
    {
      label: "New Connector",
      value: "",
      name: "newConnector",
      required: true,
      type: "text",
    },
  ];
  const handleContactDelete = (index) => {
    const newContactList = [...contactList];
    newContactList.splice(index, 1);
    setContactList(newContactList);
  };

  const handleConnectorDelete = (index) => {
    const newConnectors = [...connectors];
    newConnectors.splice(index, 1);
    setConnectors(newConnectors);
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    setValue: setValue2,
    getValues: getValues2,
    formState: { errors: errors2 },
  } = useForm();

  // Function to load data from localStorage on component mount
  useEffect(() => {
    const savedContactList = localStorage.getItem("contactList");
    const savedConnectors = localStorage.getItem("connectors");

    if (savedContactList) {
      setContactList(JSON.parse(savedContactList));
    }

    if (savedConnectors) {
      setConnectors(JSON.parse(savedConnectors));
    }
  }, []);

  // Function to save data to localStorage whenever contactList or connectors change
  useEffect(() => {
    localStorage.setItem("contactList", JSON.stringify(contactList));
    localStorage.setItem("connectors", JSON.stringify(connectors));
  }, [contactList, connectors]);

  const handleContactAdd = (res) => {
    setContactList((prev) => [
      ...prev,
      {
        fullName: res.fullName,
        position: res.position,
        email: res.email,
        phone: res.phone,
      },
    ]);

    reset();
    setIsOpen(false);
  };

  const handleConnectorAdd = (res) => {
    setConnectors((prev) => [...prev, res.newConnector]);

    reset();
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
      <div className="mb-4">
        <div className="flex justify-between mb-4">
          <div className="text-lg font-semibold text-secLine">Contacts list</div>
          <div>
            <Button classes="my-4" name={"Select contacts from DB"} />
            <Button
              name={"Add new contact"}
              className=""
              onClick={() => {
                setIsOpen(true);
                setModalHead(<h1>Add New Contact</h1>);
                setModalBody(
                  <div>
                    <CommonForm
                      classes={"grid-cols-1 gap-1"}
                      Form={contactAddForm}
                      errors={errors}
                      register={register}
                      setValue={setValue}
                      getValues={getValues}
                    />
                    <Button
                      name="Save"
                      onClick={handleSubmit(handleContactAdd)}
                    />
                  </div>
                );
              }}
            >
            </Button>
          </div>
        </div>
        <div>
          {contactList.length > 0 ? (
            <ul className="sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2 xl:grid-cols-3 list-disc pl-5">
              {contactList.map((contact, index) => (
                <li key={index} className="pb-2">
                  <div className="grid grid-rows-2">
                    <div>
                      <div className="font-bold">
                        {contact.fullName} ({contact.position})
                      </div>
                      <div className="my-1">
                        <div className=""><strong>Email:</strong>{contact.email}</div>
                        <div className=""><strong>Ph:</strong>{contact.phone}</div>
                      </div>
                    </div>
                    <div className="my-2">
                      <Button
                        classes="w-1/10"
                        name="Delete"
                        onClick={() => handleContactDelete(index)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center">
              Add a person via whom you can contact this investor.
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="text-lg font-semibold mb-4 text-secLine">Connectors</div>
        <div className="">
          <CommonForm
            classes={"grid-cols-1 gap-1 text-black"}
            Form={connectorFieldForm}
            errors={errors2}
            register={register2}
            setValue={setValue2}
            getValues={getValues2}
          />
          <Button
            classes="w-1/6 d-block mx-auto"
            name="Add Connector"
            onClick={handleSubmit2(handleConnectorAdd)}
          />
        </div>
        {connectors.map((connector, index) => (
          <div key={index} className="my-2">
            <div>
              {connector}
            </div>
            <div>
              <Button
                classes="w-1/10"
                name="Delete"
                onClick={() => handleConnectorDelete(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
