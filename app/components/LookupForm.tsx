'use client'
import {useState} from 'react';
import LookupField from './LookupField';
import LookupResults from './LookupResults';

interface Props {
    toOrFrom: "to" | "from",
    setSelectedItem: Function,
    setStartingQty: Function
}
const LookupForm = ({toOrFrom, setSelectedItem, setStartingQty}: Props) =>{
    // const [lookupOptions, setLookupOptions] = useState([]);
    const [results, setResults] = useState([]);

    return (
        <>
        <h1>Item Lookup</h1>
        <LookupField setResults={setResults}></LookupField>
        <LookupResults items={results} setSelectedItem={setSelectedItem} setStartingQty={setStartingQty}></LookupResults>
        </>
    )
}

export default LookupForm;