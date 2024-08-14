'use client'
import {useState} from 'react';
import LookupField from './LookupField';
import LookupResults from './LookupResults';

const LookupForm = () =>{
    // const [lookupOptions, setLookupOptions] = useState([]);
    const [results, setResults] = useState([]);

    return (
        <>
        <h1>Item Lookup</h1>
        <LookupField setResults={setResults}></LookupField>
        <LookupResults items={results}></LookupResults>
        </>
    )
}

export default LookupForm;