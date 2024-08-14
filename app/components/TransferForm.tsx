'use client'
import React, {useState, FormEvent} from 'react';
import TransferItem from "./TransferItem";
import TransferAmount from "./TransferAmount";

type TransferObject = {
    "fromCatalogId": string,
    "newFromQty": string,
    "toCatalogId": string,
    "newToQty": string
}




const TransferForm = () => {
    const [selectedQty, setSelectedQty] = useState(0);

    const handleQtyChange = (e) => {
        setSelectedQty(Number(e.target.value))
    }

    // const handleLookupChange = (e) => {
    //     setLookupValue(e.target.value);
    // }

    const handleSubmit = (e) => {
        console.log('handling submit')
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);
        
        const hiddenInputs = e.target.querySelectorAll('input[type="hidden"]');

        let queryObject : TransferObject = { fromCatalogId: '', newFromQty: '', toCatalogId: '', newToQty:'' }; 
        for(let i =0; i<hiddenInputs.length; i++) {
            const dataAttributes = hiddenInputs[i].dataset;
            const direction = dataAttributes.transferdirection;
            if (direction == "from") {
                queryObject.fromCatalogId = dataAttributes.productid;
                queryObject.newFromQty = dataAttributes.newvalue;
            } else if (direction == "to") {
                queryObject.toCatalogId = dataAttributes.productid;
                queryObject.newToQty = dataAttributes.newvalue;
            }
        }
        
        console.log(queryObject);
    }

    return (
        <>

        <h1>Transfer Stock</h1>

        <hr />
        <form onSubmit={handleSubmit}>
        <div className="row">
            <TransferItem productId="123" productName="Elderberries (Kitchen)" quantity={14} adjustmentQty={selectedQty} toOrFrom="from"></TransferItem>
            <TransferAmount max={14} onChangeNumber={handleQtyChange} />
            <TransferItem productId="234" productName="Elderberries" quantity={4} toOrFrom="to" adjustmentQty={selectedQty}></TransferItem>
        </div>
        <div className='row'>
            <input type="submit" className='btn btn-primary'></input>
        </div>
        </form>
        
        </>
    )
}
export default TransferForm;