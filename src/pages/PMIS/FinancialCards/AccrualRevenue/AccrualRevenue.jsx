import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Unicons from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import ToggleButton from '../../../../components/ToggleButton';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls } from '../../../../utils/url';
import InvoiceBasedForm from '../InvoiceBased/InvoiceBasedForm';
import FinanceActions from '../../../../store/actions/finance-actions';
import FilterActions from '../../../../store/actions/filter-actions';
import moment from 'moment';
import CommonForm from '../../../../components/CommonForm';
import {UilSearch} from "@iconscout/react-unicons"

const AccrualRevenue = () => {
    const [modalOpen, setmodalOpen] = useState(false)
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)
    const currentMonth = new Date().getMonth() + 1;
    const currrentYear = new Date().getFullYear();
    const [ValGm, setValGm] = useState("Monthly");
    const endDate = moment().format("Y");
    const [year, setyear] = useState(currrentYear);
    const [extraColumns, setExtraColumns] = useState([currentMonth]);
    const [newColumns, setNewColumns] = useState([]);
    const [selectType, setSelectType] = useState("");


    let dispatch = useDispatch()


    let dbConfigList = useSelector((state) => {
        let interdata = state?.financeData?.getPOAccrualRevenue || []
        return interdata?.map((itm) => {
            let updateditm = {
                ...itm,
                "uniqueId":"1",
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(FinanceActions.getPOAccrualRevenue())
                    setmodalHead("Edit User")
                    setmodalBody(<>
                        <InvoiceBased isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    console.log('ahshshhs', itm)
                    //setmodalOpen(false)
                }}></EditButton>} />,

                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.finance_poaccrual_revenue}/${itm.uniqueId}`, () => {
                                    dispatch(FinanceActions.getPOAccrualRevenue())
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-auto' onClick={() => {
                                dispatch(ALERTS({ show: false }))
                            }} name={"Cancel"} />
                        ],
                        text: "Are you sure you want to Delete?"
                    }
                    dispatch(ALERTS(msgdata))
                }}></DeleteButton>} />
            }
            return updateditm
        });
    })
    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.financeData?.getPOAccrualRevenue || []
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setValues,
        getValues,
        formState: { errors },
    } = useForm()


    // const currentMonth = new Date().getMonth();
    // const currentYear = new Date().getFullYear();
    // const fiscalYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;
    // const fiscalYearEnd = fiscalYearStart + 1;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    const getPreviousCurrentAndNextMonth = () => {
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
        const nextMonthIndex = (currentMonthIndex + 1) % 12;
        const currentYear = currentDate.getFullYear();
        const previousMonthYear =
            currentMonthIndex === 0 ? currentYear - 1 : currentYear;
        const nextMonthYear =
            currentMonthIndex === 11 ? currentYear + 1 : currentYear;

        return [
            { month: months[previousMonthIndex], year: previousMonthYear },
            { month: months[currentMonthIndex], year: currentYear },
            { month: months[nextMonthIndex], year: nextMonthYear },
        ];
    };

    const [previousMonthData, currentMonthData, nextMonthData] = getPreviousCurrentAndNextMonth();





    let customerList = useSelector((state) => {
        return state?.filterData?.getfinancialPoWOrkDoneCustomer.map((itm) => {
            return {
                label: itm.customer,
                value: itm.customer,
            };
        });
    });

    let table = {
        columns: [
            {
                name: "Customer",
                value: "customer",
                style: "min-w-[120px] max-w-[200px] text-center sticky left-0 bg-[#3e454d] z-10 p-2"
            },
            {
                name: "Project Group",
                value: "projectGroup",
                style: "min-w-[140px] max-w-[200px] text-center sticky left-[120px] bg-[#3e454d] z-10"
            },
            // {
            //     name: "Project Type",
            //     value: "projectType",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },
            {
                name: "Project ID",
                value: "projectId",
                style: "min-w-[140px] max-w-[200px] text-center sticky left-[260px] bg-[#3e454d] z-10"
            },
            {
                name: "Item Code",
                value: "itemCode",
                style: "min-w-[140px] max-w-[200px] text-center"
            },
            ...newColumns,
            // {
            //     name: `MS1 Quantity (${previousMonthData.month} ${previousMonthData.year})`,
            //     value: "prevMonthMS1",
            //     style: "min-w-[200px] max-w-[200px] text-center"
            // },
            // {
            //     name: `MS2 Quantity (${previousMonthData.month} ${previousMonthData.year})`,
            //     value: "prevMonthMS2",
            //     style: "min-w-[200px] max-w-[200px] text-center"
            // },
            // {
            //     name: `Accrual (${previousMonthData.month} ${previousMonthData.year})`,
            //     value: "prevamount",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // },
            // {
            //     name: `MS1 Quantity (${currentMonthData.month} ${currentMonthData.year})`,
            //     value: "currMonthMS1",
            //     style: "min-w-[200px] max-w-[200px] text-center"
            // },
            // {
            //     name: `MS2 Quantity (${currentMonthData.month} ${currentMonthData.year})`,
            //     value: "currMonthMS2",
            //     style: "min-w-[200px] max-w-[200px] text-center"
            // },
            // {
            //     name: `Accrual ${currentMonthData.month} ${currentMonthData.year}`,
            //     value: "curramount",
            //     style: "min-w-[140px] max-w-[200px] text-center"
            // }             

        ],
        properties: {
            rpp: [10, 20, 50, 100]
        },
        filter: [
            {
                label: "Customer",
                type: "select",
                name: "customer",
                option: customerList,
                props: {},
            },
            {
                label: "Project Group",
                type: "text",
                name: "projectGroup",
                props: {},
            },
            {
                label: "Project Type",
                type: "text",
                name: "ProjectType",
                props: {},
            },
            {
                label: "Project ID",
                type: "text",
                name: "projectId",
                props: {},
            },
            {
                label: "Item Code",
                type: "text",
                name: "itemCode",
                props: {},
            },
        ],
    };

    let listYear = [];

    // let listYear=[]

    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0, 0, 0, 0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(), 0, 1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        // Return array of year and week number
        return [d.getFullYear(), weekNo];
    }

    function weeksInYear(year) {
        var month = 11,
            day = 31,
            week;

        // Find week that 31 Dec is in. If is first week, reduce date until
        // get previous week.
        do {
            let d = new Date(year, month, day--);
            week = getWeekNumber(d)[1];
        } while (week == 1);

        return week;
    }

    let listW = [];
    for (let wwq = 1; wwq <= +weeksInYear(year); wwq++) {
        const weekString = "W-" + wwq;
        listW.push({ id: weekString, name: weekString });
    }









    for (let ywq = 2021; ywq <= +endDate; ywq++) {
        listYear.push(ywq);
    }

    let listDict = {
        "": [],
        Weekly: listW,
        // Monthly: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        Monthly: [
            { id: 1, name: "Jan" },
            { id: 2, name: "Feb" },
            { id: 3, name: "Mar" },
            { id: 4, name: "Apr" },
            { id: 5, name: "May" },
            { id: 6, name: "Jun" },
            { id: 7, name: "Jul" },
            { id: 8, name: "Aug" },
            { id: 9, name: "Sep" },
            { id: 10, name: "Oct" },
            { id: 11, name: "Nov" },
            { id: 12, name: "Dec" }
        ],
    };

    const onSubmit = (data) => {
        console.log("jsjsjsjss", data)
        let value = data.reseter
        delete data.reseter
        dispatch(FinanceActions.getPOAccrualRevenue(value, objectToQueryString(data)))
    }
    useEffect(() => {
        dispatch(
            FinanceActions.postPOAccrualRevenue(
              {
                viewBy: extraColumns.join(","),
                year: `${currrentYear}`,
                yyear: `${currrentYear}`,
                selectional: "Monthly",
                typeSelectional: "Monthly",
              },
              () => {}
            )
          );
        // dispatch(FinanceActions.getPOAccrualRevenue())
        dispatch(FilterActions.getfinancialPoWorkDoneCustomer());
    }, []);

    let formD = [
        {
            label: "Year",
            name: "year",
            value: "Select",
            type: "select",
            option: listYear.map((itmYr) => {
                return {
                    label: itmYr,
                    value: itmYr,
                };
            }),
            props: {
                onChange: (e) => {
                    setValue("yyear", e.target.value);
                    setyear(e.target.value);
                    // alert()
                },
            },
            required: true,
            classes: "col-span-1 h-38px",
        },


        // {
        //     label: "View As",
        //     name: "typeSelectional",
        //     value: "Select",
        //     type: "select",
        //     option: [
        //         {
        //             label: "Monthly View",
        //             value: "Monthly",
        //         },
        //         // {
        //         //   label: "Weekly View",
        //         //   value: "Weekly",
        //         // },
        //     ],
        //     props: {
        //         onChange: (e) => {
        //             setValue("selectional", e.target.value);
        //             setValGm(e.target.value);
        //             setSelectType(e.target.value)
        //             console.log("afasfadfaamarafasdfasdfasdf", e.target.value);
        //             console.log(selectType, 'adsfasfasdfasdfadfsa');
        //             // handle resert multiselect
        //             // alert()
        //         },
        //     },
        //     required: true,
        //     classes: "col-span-1",
        // },


        {
            label: ValGm,
            name: "viewBy",
            value: "Select",
            type: "muitiSelect",
            option: listDict[ValGm].map((dasd) => {
                return {
                    id: dasd?.id,
                    name: dasd?.name,
                };
            }),
            props: {
                selectType: selectType
            },
            hasSelectAll: true,
            required: true,
            classes: "col-span-1 h-10",
        },
    ];
    useEffect(() => {
        const monthMap = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec",
        };
        let cols = [];
        extraColumns.forEach((index) => {
            if (ValGm && ValGm === "Monthly") {
                cols.push([
                    {
                        name: `MS1 Quntity (${monthMap[index]} ${year})`,
                        // value: "aop_target-" + index + "",
                        value:"("+ index + ", 'MS1')",
                        style: "min-w-[200px] max-w-[200px] text-center",
                    },
                    {
                        name: `MS2 Quantity (${monthMap[index]} ${year})`,
                        // value: "M-" + index + "_y",
                        value:"("+ index + ", 'MS2')",
                        style: "min-w-[200px] max-w-[200px] text-center",
                    },
                    {
                        name: `Accrual (${monthMap[index]} ${year})`,
                        // value: "M-" + index + "_x",
                        value:"amount"+index,
                        style: "min-w-[200px] max-w-[200px] text-center",
                    },
                ]);
            } else {
                cols.push([
                    {
                        name: `MS1 Quntity (${index} ${year})`,
                        value: '',
                        style: "min-w-[200px] max-w-[200px] text-center",
                    },
                    {
                        name: `MS2 Quantity (${index} ${year})`,
                        value: '',
                        style: "min-w-[200px] max-w-[200px] text-center",
                    },
                    {
                        name: `Accrual (${index} ${year})`,
                        value: index,
                        style: "min-w-[200px] max-w-[200px] text-center",
                    },
                ]);
            }
        });
        cols = cols.flat(Infinity);

        setNewColumns(cols);
    }, [extraColumns]);

    const handleAddActivity = (res) => {
        try {
            if (res?.typeSelectional === "Monthly") {
                setExtraColumns(
                    res?.viewBy
                        ?.split(",")
                        ?.map((key) => +key)
                        ?.sort((a, b) => a - b)
                );
            } else {
                setExtraColumns(res?.viewBy?.split(",")?.sort((a, b) => {
                    const numA = parseInt(a.split("-")[1]);
                    const numB = parseInt(b.split("-")[1]);

                    return numA - numB;
                }));
            }
            dispatch(FinanceActions.postPOAccrualRevenue(res, () => { }));
        } catch (error) {
            console.error("[ERROR] :: " + error.message);
        }
    };
    console.log("afadfasfasfadfadsfafaf", extraColumns);
    return (
        <>
            <div className="flex">
                <CommonForm
                    classes={"w-5/6 grid-cols-3 gap-1 h-[111px]"}
                    Form={formD}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                />

                <div className="pt-12 p-6  flex justify-center">
                    <Button
                        classes=""
                        name="Search "
                        icon={<UilSearch className="w-4 h-4 mx-2" />}
                        onClick={handleSubmit(handleAddActivity)}
                    />
                </div>
            </div>
            <AdvancedTable
                // headerButton={<><Button onClick={(e) => {
                //     setmodalOpen(prev => !prev)
                //     setmodalHead("New PO Life Cycle ")
                //     setmodalBody(<POLifeCycleForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                // }}
                //     name={"Add New"}></Button></>}
                table={table}
                filterAfter={onSubmit}
                exportButton={["/export/accrualRevenue", "Export_Accrual_Revenue.xlsx"]}
                tableName={"UserListTable"}
                handleSubmit={handleSubmit}
                data={dbConfigList}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                totalCount={dbConfigTotalCount}
                heading = {'Total Count:- '}
                getaccessExport = {"Export(Accural Revenue)"}
            />

            <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

            {/* <CommonForm/> */}
        </>
    )
};

export default AccrualRevenue;