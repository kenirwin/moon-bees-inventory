'use client'
import {useState} from 'react'

interface Props { 
  setResults: Function,
  setResultsVisibility: Function
}
const LookupField = ({setResults, setResultsVisibility}: Props) => {
  const [lookupValue, setLookupValue] = useState('');
    
  const handleLookupChange = async (value) => {
      setResultsVisibility(true);
      setLookupValue(value);
      let res = await fetch(`/api/catalog/search?q=${value}`);
      let json = await res.json();
      setResults(json)
      console.log('Lookup Results:', json);
  }

  return (
    <div className="lookup-form">
        <input type="text" value={lookupValue} onChange={(e => handleLookupChange(e.target.value))} placeholder='Item Lookup'></input>
    </div>
  )
}

export default LookupField