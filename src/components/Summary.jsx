import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import CommonForm from "./CommonForm";
import { useForm } from "react-hook-form";
import Button from "./Button";

const Summary = ({ data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalBody, setModalBody] = useState(<></>);
  const [modalHead, setModalHead] = useState(<></>);

  const roles = ["None", "Leads", "Co-invests"];
  const roleOptions = roles.map((role) => {
    return {
      label: `${role}`,
      value: role,
    };
  });

  const stageFocusOptions = [
    "Buyout",
    "Early Stage Vc",
    "Later Stage Vc",
    "Mergers and Acquisitions",
    "PE Growth/Expansion",
    "Pre Seed",
    "Seed Round",
    "Debt",
    "Mezzanine",
    "Other",
    "Recapitalization",
  ].map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  const generalInfoForm = [
    { label: "Type", value: "", name: "type", required: true, type: "text" },
    {
      label: "Role",
      value: "",
      name: "role",
      required: true,
      type: "select",
      option: roleOptions,
    },
    {
      label: "New Link",
      value: "",
      name: "newLink",
      required: false,
      type: "text",
    },
    ...data.links.map((link, index) => {
      let l = index === 0 ? "old links :" : "";
      return {
        label: l,
        value: link,
        name: `link${index}`,
        required: true,
        type: "text",
      };
    }),
    {
      label: "Stage Focus",
      value: "",
      name: "stageFocus",
      required: true,
      type: "select",
      option: stageFocusOptions,
    },
    {
      label: "Geography Focus",
      value: "",
      name: "geographyFocus",
      required: true,
      type: "text",
    },
    {
      label: "Fund Size / Aum",
      value: "",
      name: "fundSize",
      required: true,
      type: "text",
    },
    {
      label: "Industry Focus",
      value: "",
      name: "industryFocus",
      required: true,
      type: "text",
    },
    {
      label: "Description",
      value: "",
      name: "description",
      required: true,
      type: "text",
    },
  ];

  const commitmentsForm = [
    {
      label: "Commitment Probability",
      value: "",
      name: "commitmentProbability",
      required: true,
      type: "text",
    },
    {
      label: "Amount Commited",
      value: "",
      name: "amountCommited",
      required: true,
      type: "text",
    },
  ];
  const previousInvestmentsForm = [
    {
      label: "New investment",
      value: "",
      name: "newInvestment",
      required: true,
      type: "text",
    },
  ];

  const customFieldsAddForm = [
    {
      label: "Field Name",
      value: "",
      name: "fieldName",
      required: true,
      type: "text",
    },
    {
      label: "Field Value",
      value: "",
      name: "fieldValue",
      required: true,
      type: "text",
    },
  ];

  const reviewsForm = [
    {
      label: "Rating",
      value: "",
      name: "rating",
      required: true,
      type: "text",
    },
    {
      label:
        "What is your best piece of advice for approaching, pitching, or closing this Investor?",
      value: "",
      name: "advice",
      required: true,
      type: "text",
    },
  ];

  const tp = {
    type: data.type,
    role: data.role,
    industryFocus: data.industry_focus.join(","),
    stageFocus: data.stage_focus[0],
    geographyFocus: data.geography_focus,
    fundSize: data.fund_size,
    description: data.description,
    commitmentProbability: data.commitments[0].commitment_probability,
    amountCommited: data.commitments[0].amount_commited,
  };

  data.links.map((link, index) => {
    let x = `link${index}`;
    tp[x] = link;
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: tp,
  });

  const onGeneralInfoSubmit = (res) => {
    setData((prev) => {
      let temp = { ...prev };

      temp = {
        ...temp,
        links: temp.links
          .filter((link, index) => {
            return res[`link${index}`];
          })
          .map((link, index) => {
            return res[`link${index}`];
          }),
      };

      if (res.newLink && res.newLink !== "") {
        temp = { ...temp, links: [...temp.links, res.newLink] };
      }

      temp = {
        ...temp,
        type: res.type,
        industry_focus: [...res.industryFocus.split(",")],
        stage_focus: [res?.stageFocus],
        geography_focus: res?.geographyFocus,
        fund_size: res?.fundSize,
        description: res?.description,
      };

      return temp;
    });

    reset();
    setIsOpen(false);
  };

  const handleReviewSubmit = (res) => {
    setData((prev) => ({
      ...prev,
      reviews: [
        ...data.reviews,
        {
          rating: res?.rating,
          advice: res?.advice,
        },
      ],
    }));
    reset();
    setIsOpen(false);
  };

  const handleCustomFieldSubmit = (res) => {
    setData((prev) => ({
      ...prev,
      custom_fields: [
        ...data.custom_fields,
        {
          fieldName: res?.fieldName,
          fieldValue: res?.fieldValue,
        },
      ],
    }));
    reset();
    setIsOpen(false);
  };

  const handleCommitmentSubmit = (res) => {
    setData((prev) => ({
      ...prev,
      commitments: [
        {
          commitment_probability: res?.commitmentProbability,
          amount_commited: res?.amountCommited,
        },
      ],
    }));
    reset();
    setIsOpen(false);
  };

  const handlePrevInvestmentSubmit = (res) => {
    setData((prev) => ({
      ...prev,
      previous_investments: [...data.previous_investments, res.newInvestment],
    }));
    reset();
    setIsOpen(false);
  };

  return (
    <div className="grid grid-cols-1 gap-x-2 md:grid-cols-2 text-sm font-poppins">
      <Modal
        size={"sm"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalHead={modalHead}
      >
        {modalBody}
      </Modal>
      <div>
        <div className="border-b border-b-gray-300">
          <div className="flex items-center">
            <div className="text-lg font-semibold text-secLine">General information</div>
            <button
              className="underline hover:cursor-pointer text-sm font-semibold  ml-2"
              onClick={() => {
                setIsOpen(true);
                setModalHead(<h1>General Information</h1>);
                setModalBody(
                  <div>
                    <CommonForm
                      classes={"grid-cols-1 gap-1"}
                      Form={generalInfoForm}
                      errors={errors}
                      register={register}
                      setValue={setValue}
                      getValues={getValues}
                    />
                    <Button
                      name="Save"
                      onClick={handleSubmit(onGeneralInfoSubmit)}
                    />
                  </div>
                );
              }}
            >
              Edit
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex mb-4">
              <div className="">
                <div className="text-gray-500 font-semibold underline underline-offset-1">Type</div>
                <div>{data?.type}</div>
              </div>
              <div className="ml-20">
                <div className="text-gray-500 font-semibold underline underline-offset-1">Social Media</div>
                <div>
                  {data.links.map((link) => (
                    <div>{link}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-gray-500 font-semibold underline underline-offset-1 ">Industry Focus</div>
              <div className="flex flex-wrap">
                {data?.industry_focus?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-fit m-1 text-white mr-1 bg-secLine px-1.5 py-1 rounded-sm"
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <div className="text-gray-500 font-semibold underline underline-offset-1">Stage Focus</div>
              <div className="flex flex-wrap">
                {data?.stage_focus.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-fit m-1 text-white mr-1 bg-secLine px-1.5 py-1 rounded-sm"
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <div className="text-gray-500 font-semibold underline underline-offset-1">Geography Focus</div>
              <div>{data?.geography_focus}</div>
            </div>
            <div className="mb-4">
              <div className="text-gray-500 font-semibold underline underline-offset-1">Fund Size/Aum</div>
              <div>
                <span>$ </span>
                {data?.fund_size}
              </div>
            </div>
            <div className="mb-4">
              <div className="text-gray-500 font-semibold underline underline-offset-1">Description</div>
              <div>{data?.description}</div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-b border-b-gray-300 pb-4 md:border-0 md:pb-0">
          <div className="text-lg font-semibold text-secLine">Review</div>
          <div className="py-2">
            {data?.reviews?.length == 0 ? (
              <div>
                Because “founder karma” is real, and raising capital is one of
                the hardest jobs of any startup CEO. Pay it forward, or pay it
                back to fellow founders who have helped you along your startup
                journey. Plus, adding your insights now will improve investor
                transparency in the future - making your subsequent rounds
                easier to raise.
              </div>
            ) : (
              data?.reviews.map((review) => (
                <div>
                  <div className="font-bold">
                    ( {review.rating} Star ){" "}
                    <span className="font-normal">{review.advice}</span>{" "}
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            className="underline hover:cursor-pointer text-sm font-semibold "
            onClick={() => {
              setIsOpen(true);
              setModalHead(<h1>Add Review</h1>);
              setModalBody(
                <div>
                  <CommonForm
                    classes={"grid-cols-1 gap-1"}
                    Form={reviewsForm}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <Button
                    name="Save"
                    onClick={handleSubmit(handleReviewSubmit)}
                  />
                </div>
              );
            }}
          >
            Add review
          </button>
        </div>
      </div>

      <div>
        <div className="border-b border-b-gray-300 pb-4">
          <div className="flex">
            <div className="text-lg font-semibold text-secLine">Commitments</div>
            <button
              className="underline hover:cursor-pointer text-sm font-semibold  ml-2"
              onClick={() => {
                setIsOpen(true);
                setModalHead(<h1>Edit commitments</h1>);
                setModalBody(
                  <div>
                    <CommonForm
                      classes={"grid-cols-1 gap-1"}
                      Form={commitmentsForm}
                      errors={errors}
                      register={register}
                      setValue={setValue}
                      getValues={getValues}
                    />
                    <Button
                      name="Save"
                      onClick={handleSubmit(handleCommitmentSubmit)}
                    />
                  </div>
                );
              }}
            >
              Edit
            </button>
          </div>
          <div>
            {data?.commitments?.map((commitment, index) => {
              return (
                <div key={index}>
                  <div>{`Commitment Probablity : ${commitment?.commitment_probability}%`}</div>
                  <div>{`Amount Commited : $${commitment?.amount_commited}`}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="py-4 border-b border-b-gray-300">
          <div className="flex">
            <div className="text-lg font-semibold text-secLine">Previous investments</div>
            <button
              className="underline hover:cursor-pointer text-sm font-semibold  ml-2"
              onClick={() => {
                setIsOpen(true);
                setModalHead(<h1>Edit Investments</h1>);
                setModalBody(
                  <div>
                    <CommonForm
                      classes={"grid-cols-1 gap-1"}
                      Form={previousInvestmentsForm}
                      errors={errors}
                      register={register}
                      setValue={setValue}
                      getValues={getValues}
                    />
                    <Button
                      name="Add"
                      onClick={handleSubmit(handlePrevInvestmentSubmit)}
                    />
                  </div>
                );
              }}
            >
              Edit
            </button>
          </div>
          <ul className="list-disc pl-5">
            {data?.previous_investments.map((item) => {
              return <li>{item}</li>;
            })}
          </ul>
        </div>

        <div className="pt-4">
          <div className="text-lg font-semibold text-secLine">Custom Fields</div>
          <div className="py-2">
            {data?.custom_fields.length == 0 ? (
              <div className="">
                Create a custom field to fit your unique needs. No more
                struggling to find a place to store important information that
                doesn't quite fit the mold.
              </div>
            ) : (
              <ul className="list-disc pl-5">
                {data?.custom_fields.map((item, index) => {
                  return (
                    <li key={index}>
                      <span className="font-bold">{item?.fieldName}</span> -
                      {"> "}
                      {item?.fieldValue}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <button
            className="underline hover:cursor-pointer text-sm font-semibold "
            onClick={() => {
              setIsOpen(true);
              setModalHead(<h1>Custom Fields</h1>);
              setModalBody(
                <div>
                  <CommonForm
                    classes={"grid-cols-1 gap-1"}
                    Form={customFieldsAddForm}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <Button
                    name="Save"
                    onClick={handleSubmit(handleCustomFieldSubmit)}
                  />
                </div>
              );
            }}
          >
            Add Custom Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
