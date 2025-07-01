

export let kyc_doc_type = [
    {
        "label": "PASSPORT",
        "value": "PASSPORT"
    },
    {
        "label": "NATIONAL ID CARD",
        "value": "NATIONAL ID CARD"
    },
    {
        "label": "DRIVING LICENCE",
        "value": "DRIVING LICENCE"
    }
]





// #########################################INVESTMENT END
export let all_command_type = [
    {
        "label": "Select",
        "value": "blank"
    }, {
        "label": "Order",
        "value": "order"
    },
    {
        "label": "Join",
        "value": "joins"
    },
    {
        "label": "Aggregation Function",
        "value": "aggregationFunction"
    }
]

export let where_all_command_type = [
    {
        "label": "Select",
        "value": "blank"
    },
    {
        "label": "Where",
        "value": "where"
    }
]

export let all_command_type_wise = {


    "blank": [
        {
            "label": "Select",
            "value": "blank"
        }
    ],
    "order": [
        {
            "label": "Select",
            "value": "blank"
        }, {
            "label": "Not sorted",
            "value": "Not sorted"
        },
        {
            "label": "Ascending",
            "value": "Ascending"
        },
        {
            "label": "Descending",
            "value": "Descending"
        }
    ],
    "where": [
        {
            "label": "Select",
            "value": "blank"
        }, {
            "label": "starts with",
            "value": "starts with"
        },
        {
            "label": "contains",
            "value": "contains"
        },
        {
            "label": "is equal to",
            "value": "is equal to"
        },
        {
            "label": "is in list",
            "value": "is in list"
        },
        {
            "label": "does not start with",
            "value": "does not start with"
        },
        {
            "label": "does not contain",
            "value": "does not contain"
        },
        {
            "label": "is not equal to",
            "value": "is not equal to"
        },
        {
            "label": "is not in list",
            "value": "is not in list"
        },
        {
            "label": "is null",
            "value": "is null"
        },
        {
            "label": "is not null",
            "value": "is not null"
        },
        {
            "label": "greater than",
            "value": "greater than"
        },
        {
            "label": "less than",
            "value": "less than"
        },
        {
            "label": "greater than or equal to",
            "value": "greater than or equal to"
        },
        {
            "label": "less than or equal to",
            "value": "less than or equal to"
        }
    ],
    "joins": [
        {
            "label": "Select",
            "value": "blank"
        }, {
            "label": "INNER JOIN",
            "value": "INNER JOIN"
        },
        {
            "label": "LEFT JOIN",
            "value": "LEFT JOIN"
        },
        {
            "label": "RIGHT JOIN",
            "value": "RIGHT JOIN"
        },
        {
            "label": "FULL JOIN",
            "value": "FULL JOIN"
        },
        {
            "label": "CROSS JOIN",
            "value": "CROSS JOIN"
        },
        {
            "label": "SELF JOIN",
            "value": "SELF JOIN"
        }
    ],
    "aggregationFunction": [
        {
            "label": "Select",
            "value": "blank"
        }, {
            "label": "COUNT",
            "value": "COUNT"
        },
        {
            "label": "SUM",
            "value": "SUM"
        },
        {
            "label": "AVG",
            "value": "AVG"
        },
        {
            "label": "MIN",
            "value": "MIN"
        },
        {
            "label": "MAX",
            "value": "MAX"
        }
    ]
}

export function sql_data_generator(mainobj) {
    const groupedObj = Object.keys(mainobj).reduce((result, key) => {
        const match = key.match(/_(\d+)_form/);
        if (match) {
            const groupNumber = match[1];
            result[groupNumber] = result[groupNumber] || {};
            result[groupNumber][key] = mainobj[key];
        } else {
            result[key] = mainobj[key];
        }
        return result;
    }, []);

    // console.log(groupedObj);
    let ata = {}
    groupedObj.map((itm) => {

        console.log(Object.keys(itm).indexOf("condition_1_form"))
        let vel = Object.keys(itm).findIndex((itm) => itm.includes("condition"));

        if (ata[itm[Object.keys(itm)[0]]] == undefined) {

            console.log(Object.keys(itm))

            ata[itm[Object.keys(itm)[vel]]] = []
        }
        ata[itm[Object.keys(itm)[vel]]].push(itm)
    })

    return ata
}

export let uiStatusColor = {
    "Open":"bg-orange-600 text-white",
    "Close":"bg-green-600 text-white"
}


export let onehundcolor = [
    "bg-[#ff66cc]",
    "bg-[#7e5ebf]",
    "bg-[#2dbd77]",
    "bg-[#fd9239]",
    "bg-[#6db26a]",
    "bg-[#cc537c]",
    "bg-[#4aa6e0]",
    "bg-[#e54a4a]",
    "bg-[#9f88c5]",
    "bg-[#ffb93d]",
    "bg-[#3e8d8a]",
    "bg-[#e64c4c]",
    "bg-[#5ea89c]",
    "bg-[#f9a53e]",
    "bg-[#4989d3]",
    "bg-[#ba6494]",
    "bg-[#76b75f]",
    "bg-[#c55d2d]",
    "bg-[#3f7bbb]",
    "bg-[#d8577b]",
    "bg-[#559a72]",
    "bg-[#f3a53d]",
    "bg-[#7e4e97]",
    "bg-[#4a9ad2]",
    "bg-[#cf573f]",
    "bg-[#3f7eab]",
    "bg-[#e34545]",
    "bg-[#5c8d8a]",
    "bg-[#bb654e]",
    "bg-[#2db68d]",
    "bg-[#e34a67]",
    "bg-[#639b6f]",
    "bg-[#edac3f]",
    "bg-[#4576a7]",
    "bg-[#a65e8f]",
    "bg-[#6fa769]",
    "bg-[#cc643d]",
    "bg-[#3c81ae]",
    "bg-[#ec4747]",
    "bg-[#589788]",
    "bg-[#e39449]",
    "bg-[#4f8ed5]",
    "bg-[#c3626e]",
    "bg-[#78b86d]",
    "bg-[#d75d3b]",
    "bg-[#4e7ca3]",
    "bg-[#ea5a5a]",
    "bg-[#53967c]",
    "bg-[#f3a346]",
    "bg-[#5b7aa4]",
    "bg-[#da5b66]",
    "bg-[#3a8b72]",
    "bg-[#f3ad4c]",
    "bg-[#7c5887]",
    "bg-[#53967c]",
    "bg-[#e45251]",
    "bg-[#598b76]",
    "bg-[#ef8944]",
    "bg-[#4476a6]",
    "bg-[#c15a8c]",
    "bg-[#78b86d]",
    "bg-[#f5964c]",
    "bg-[#4a87ce]",
    "bg-[#bd6142]",
    "bg-[#3e849e]",
    "bg-[#ea5b64]",
    "bg-[#5f926d]",
    "bg-[#ef8644]",
    "bg-[#4278a5]",
    "bg-[#c45b78]",
    "bg-[#77b56f]",
    "bg-[#f49044]",
    "bg-[#5877a3]",
    "bg-[#e65156]",
    "bg-[#5c9177]",
    "bg-[#f5964c]",
    "bg-[#4d82be]",
    "bg-[#c45d55]",
    "bg-[#78b86d]",
    "bg-[#ed9845]",
    "bg-[#4278a5]",
    "bg-[#d35768]",
    "bg-[#3f8da2]",
    "bg-[#ea6265]",
    "bg-[#628e6d]",
    "bg-[#f18a44]",
    "bg-[#5476a2]",
    "bg-[#eb5f5f]",
    "bg-[#5c8e77]",
    "bg-[#f39c4e]",
    "bg-[#4c84bc]",
    "bg-[#d75863]",
    "bg-[#4279a2]",
    "bg-[#e65e61]",
    "bg-[#5e8f76]",
    "bg-[#f18c47]",
    "bg-[#5376a1]",
    "bg-[#ec6367]",
    "bg-[#618e6d]",
    "bg-[#f29148]",
    "bg-[#4f85bf]"
];
export let uiList = {
    "text": {
        "height": "h-[40px] w-full border-sm border-black"
    },
    "file": {
        "height": "h-[40px] w-full"
    },
    "password": {
        "height": "h-[40px] w-full"
    },
    "number": {
        "height": "h-[40px] w-full"
    },
    "decimal": {
        "height": "h-[40px] w-full"
    },
    "email": {
        "height": "h-[40px] w-full"
    },
    "hidden": {
        "height": "h-[40px] w-[80px] max-w-[80px] min-w-[80px]"
    },
    "select": {
        "height": "h-[40px] w-full"
    },
    "datetime": {
        "height": "h-[40px] w-full"
    },
    "muitiSelect": {
        "height": "h-[40px] w-full"
    },
    "BigmuitiSelect": {
        "height": "h-full w-full"
    },
    
    "checkbox": {
        "height": "h-[40px] w-[20px] max-w-[80px] min-w-[20px]"
    },
    "sdisabled": {
        "height": "h-[40px] w-full"
    },
    "hdisabled": {
        "height": "h-[40px] w-full"
    },
    "textarea": {
        "height": "h-[70px] w-full"
    }
}


export let completiton_critieria=[
    { id: "Completion Date", name: "Completion Date" },
    { id: "Checklist", name: "Checklist" },
    { id: "MO No", name: "MO No" },
    { id: "Challan copy", name: "Challan copy" },
    { id: "Attachment", name: "Attachment" },
    { id: "Reference No", name: "Reference No" }
]


export let types = ["text", "password", "email", "hidden", "number"];