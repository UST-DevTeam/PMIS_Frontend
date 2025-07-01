import React from 'react'

const CstmButton = ({ child , classes = "" }) => {

    return (
        <div className={classes+" py-[4px] px-2 flex justify-center"}>
            {child}
        </div>
    )
}

export default CstmButton