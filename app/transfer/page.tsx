'use client'
import {useState} from 'react'
import TransferForm from '../components/TransferForm'
// import LookupForm from '../components/LookupForm';
import {CatalogObject} from '../lib/myTypes';

export default function Transfer () {
    // const [fromItem, setFromItem] = useState({});

    return (
    <>
    <hr />
    {/* <TransferForm fromItem={fromItem} toOrFrom="from"></TransferForm> */}
    <TransferForm></TransferForm>
    </>
    )
}