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
    const [lookupResultsVisible, setLookupResultsVisible] = useState(false)

    return (
        <>
        <LookupField setResults={setResults} setResultsVisibility={setLookupResultsVisible}></LookupField>
        <LookupResults items={results} setSelectedItem={setSelectedItem} setStartingQty={setStartingQty} setResultsVisibility={setLookupResultsVisible} show={lookupResultsVisible}></LookupResults>
        </>
    )
}

export default LookupForm;