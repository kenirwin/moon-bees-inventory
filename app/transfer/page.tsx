'use client'
import {useState} from 'react'
import TransferForm from '../components/TransferForm'
import LookupForm from '../components/LookupForm';

export default function Transfer () {
    const [lookupValue, setLookupValue] = useState('');

    return (
    <>
    <LookupForm></LookupForm>
    <hr />
    <TransferForm></TransferForm>
    </>
    )
}