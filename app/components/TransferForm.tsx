'use client'
import React, {useState, FormEvent} from 'react';
import TransferItem from "./TransferItem";
import TransferAmount from "./TransferAmount";
import LookupForm from './LookupForm';
import { TransferObject } from '../lib/myTypes';
import { CatalogObject } from '../lib/myTypes';
import Alert from './Alert';
import { BootstrapAlertColors } from '../lib/myTypes';

const TransferForm = () => {
    const [fromItem, setFromItem] = useState<CatalogObject>({});
    const [toItem, setToItem] = useState<CatalogObject>({});
    const [fromStartingQty, setFromStartingQty] = useState(undefined);
    const [toStartingQty, setToStartingQty] = useState(undefined);
    const [selectedQty, setSelectedQty] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState<BootstrapAlertColors>('info');
    const [alertVisibility, setAlertVisibility] = useState(false);

    const handleQtyChange = (e) => {
        setSelectedQty(Number(e.target.value))
    }

    const resetForm = () => {
        setFromItem({});
        setToItem({});
        setFromStartingQty(undefined);
        setToStartingQty(undefined);
        setSelectedQty(0);
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

        fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/inventory/transfer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryObject),
            }).then(response => response.json())
            .then(data =>  {
                console.log('updated inventory:',data);
                setAlertColor('success');
                setAlertMessage('Success!' + JSON.stringify(data.counts.map((i) => {return {catalogObjectId: i.catalogObjectId, quantity: i.quantity}})));
                setAlertVisibility(true);
                resetForm();
            })
            
    }

    return (
        <>
       {alertVisibility && <Alert color={alertColor} dismissible={true} onClose={()=>setAlertVisibility(false)}>{alertMessage}</Alert>}
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