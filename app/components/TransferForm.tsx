'use client'
import React, {useState, FormEvent} from 'react';
import TransferItem from "./TransferItem";
import TransferAmount from "./TransferAmount";
import LookupForm from './LookupForm';
import { TransferObject } from '../lib/myTypes';
import { CatalogObject } from '../lib/myTypes';

// type TransferObject = {
//     "fromCatalogId": string,
//     "newFromQty": string,
//     "toCatalogId": string,
//     "newToQty": string
// }

interface Props { 
    // fromItem?: CatalogObject;
    // toItem?: CatalogObject;
}


const TransferForm = ({}: Props) => {
    const [fromItem, setFromItem] = useState({});
    const [toItem, setToItem] = useState({});
    const [fromStartingQty, setFromStartingQty] = useState(undefined);
    const [toStartingQty, setToStartingQty] = useState(undefined);
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

        fetch('http://localhost:3000/api/inventory/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryObject),
            }).then(response => response.json())
            .then(data => console.log('updated inventory:',data))
    }

    return (
        <>

        <h1>Transfer Stock</h1>

        <hr />
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-md-5">
                <LookupForm toOrFrom="from" setSelectedItem={setFromItem} setStartingQty={setFromStartingQty}></LookupForm>
                <TransferItem productId={fromItem?.varId} productName={fromItem?.name} quantity={fromStartingQty} adjustmentQty={selectedQty} toOrFrom="from"></TransferItem>
            </div>
            <div className="col-md-2">
                <TransferAmount max={fromStartingQty} onChangeNumber={handleQtyChange} />

            </div>
            <div className="col-md-5">
                <LookupForm toOrFrom="to" setSelectedItem={setToItem} setStartingQty={setToStartingQty}></LookupForm>
                <TransferItem productId={toItem?.varId} productName={toItem?.name} quantity={toStartingQty} toOrFrom="to" adjustmentQty={selectedQty}></TransferItem>
            </div>
        </div>
        <div className='row'>
            <input type="submit" className='btn btn-primary'></input>
        </div>
        </form>
        
        </>
    )
}
export default TransferForm;